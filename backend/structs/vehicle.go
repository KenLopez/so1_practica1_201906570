package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

type Vehicle struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Placa  string             `json:"placa,omitempty"`
	Marca  string             `json:"marca,omitempty"`
	Modelo string             `json:"modelo,omitempty"`
	Serie  string             `json:"serie,omitempty"`
	Color  string             `json:"color,omitempty"`
}
