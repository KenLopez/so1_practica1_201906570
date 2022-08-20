package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"backend/structs"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func log(action string) {
	entry := structs.Log{
		Time: time.Now().String(),
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
	log("registro")
	json.NewEncoder(w).Encode(result)

}

func updateVehicle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	w.Header().Add("content-type", "application/json")

	var v structs.Vehicle
	json.NewDecoder(r.Body).Decode(&v)

	collection := client.Database("vehicleDB").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.UpdateByID(ctx, bson.D{{"_id", id}}, v)
	log("actualización")
	json.NewEncoder(w).Encode(result)

}

func getVehicles(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var vehicles []structs.Vehicle

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

func main() {
	fmt.Println("Listening on port 3000...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	router := mux.NewRouter()

	// Routes
	router.HandleFunc("/vehicle", createVehicle).Methods("POST")
	router.HandleFunc("/vehicle", getVehicles).Methods("GET")
	router.HandleFunc("/vehicle/{id}", updateVehicle).Methods("PUT")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "DELETE", "PUT"},
	})

	handler := c.Handler(router)

	http.ListenAndServe(":3000", handler)

	defer client.Disconnect(ctx)

}
