package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"backend/structs"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func log(action string) {
	entry := structs.Log{
		Time: time.Now().Format("2006-01-02 15:04:05 Monday"),
		Func: action,
	}

	collection := client.Database("vehicleDB").Collection("log")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, entry)
	fmt.Println(result)
}

// Endpoints
func createVehicle(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var v structs.Vehicle
	json.NewDecoder(r.Body).Decode(&v)

	collection := client.Database("vehicleDB").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, v)
	if result != nil && result.InsertedID != "" {
		log("Registrar")
	}
	json.NewEncoder(w).Encode(result)

}

func updateVehicle(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var v structs.Vehicle
	json.NewDecoder(r.Body).Decode(&v)

	filter := bson.M{"_id": v.ID}

	update := bson.M{
		"$set": bson.M{
			"placa":  v.Placa,
			"marca":  v.Marca,
			"modelo": v.Modelo,
			"serie":  v.Serie,
			"color":  v.Color,
		},
	}

	collection := client.Database("vehicleDB").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.UpdateOne(ctx, filter, update)
	if result != nil && result.MatchedCount > 0 {
		log("Actualizar")
	}
	json.NewEncoder(w).Encode(result)

}

func deleteVehicle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := vars["id"]
	oid, _ := primitive.ObjectIDFromHex(id)

	w.Header().Add("content-type", "application/json")

	var v structs.Vehicle
	json.NewDecoder(r.Body).Decode(&v)

	filter := bson.M{"_id": oid}

	collection := client.Database("vehicleDB").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.DeleteOne(ctx, filter)
	if result != nil && result.DeletedCount > 0 {
		log("Eliminar")
	}
	json.NewEncoder(w).Encode(result)

}

func getVehicles(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	vehicles := make([]structs.Vehicle, 0)

	collection := client.Database("vehicleDB").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var v structs.Vehicle
		cursor.Decode(&v)
		vehicles = append(vehicles, v)
	}

	json.NewEncoder(w).Encode(vehicles)

}

func getLog(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	log := make([]structs.Log, 0)

	collection := client.Database("vehicleDB").Collection("log")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var entry structs.Log
		cursor.Decode(&entry)
		log = append(log, entry)
	}
	json.NewEncoder(w).Encode(log)

}

func main() {
	fmt.Println("Listening on port 3000...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	router := mux.NewRouter()

	// Routes
	router.HandleFunc("/vehicle", createVehicle).Methods("POST")
	router.HandleFunc("/vehicle", getVehicles).Methods("GET")
	router.HandleFunc("/vehicle", updateVehicle).Methods("PUT")
	router.HandleFunc("/vehicle/{id}", deleteVehicle).Methods("DELETE")

	router.HandleFunc("/log", getLog).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "DELETE", "PUT"},
	})

	handler := c.Handler(router)

	http.ListenAndServe(":3000", handler)

	defer client.Disconnect(ctx)

}
