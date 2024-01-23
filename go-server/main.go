package main

import (
	"fmt"

	"knight-light/api"
)

func main() {
	server := api.NewServer()
	fmt.Println("Starting Knight Light Server!")

	if err := server.Listen(":8080"); err != nil {
		panic(err)
	}
}
