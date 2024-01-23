package main

import (
	"fmt"

	"code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server/api"
)

func main() {
	server := api.NewServer()
	fmt.Println("Starting Knight Light Server!")

	if err := server.Listen(":8080"); err != nil {
		panic(err)
	}
}
