package api

import (
	"github.com/gofiber/fiber/v2"
)

type StatusResponse struct {
	Status  string `json:"status"`
	Version string `json:"version"`
	Server  string `json:"server"`
}

var lightStatus = &StatusResponse{Status: "OFF", Version: "v1.0.0-rc", Server: "go"}

func NewServer() *fiber.App {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(lightStatus)
	})

	app.Post("/activate", func(c *fiber.Ctx) error {
		lightStatus.Status = "ON"
		return c.JSON(lightStatus)
	})

	app.Post("/deactivate", func(c *fiber.Ctx) error {
		lightStatus.Status = "OFF"
		return c.JSON(lightStatus)
	})

	return app
}
