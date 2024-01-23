package main

import (
	"fmt"

	"github.com/CMS-Enterprise/batcave-knight-light/tree/main/go-server/api"
)

func main() {
	server := api.NewServer()
	fmt.Println("Starting Knight Light Server!")

	if err := server.Listen(":8080"); err != nil {
		panic(err)
	}
}
