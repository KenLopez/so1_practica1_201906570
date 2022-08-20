package structs

import "go.mongodb.org/mongo-driver/bson/primitive"

type Log struct {
	ID   primitive.ObjectID `bson:"_id,omitempty"`
	Time string             `json:"time,omitempty"`
	Func string             `json:"func,omitempty"`
}
