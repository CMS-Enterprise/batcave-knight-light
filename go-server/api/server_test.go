package api

import (
	"encoding/json"
	"net/http/httptest"
	"testing"
)

func TestNewServer(t *testing.T) {
	server := NewServer()

	req := httptest.NewRequest("GET", "/", nil)
	res, _ := server.Test(req, 1)

	var resObj StatusResponse

	if err := json.NewDecoder(res.Body).Decode(&resObj); err != nil {
		t.Fatal(err)
	}

	if resObj.Status != "OFF" {
		t.Fatal("Expected initial Status to be off")
	}

	req = httptest.NewRequest("POST", "/activate", nil)
	res, _ = server.Test(req, 1)

	resObj = StatusResponse{}

	if err := json.NewDecoder(res.Body).Decode(&resObj); err != nil {
		t.Fatal(err)
	}

	if resObj.Status != "ON" {
		t.Fatal("Expected Status to be on after activate POST")
	}

	req = httptest.NewRequest("POST", "/deactivate", nil)
	res, _ = server.Test(req, 1)

	resObj = StatusResponse{}

	if err := json.NewDecoder(res.Body).Decode(&resObj); err != nil {
		t.Fatal(err)
	}

	if resObj.Status != "OFF" {
		t.Fatal("Expected Status to be OFF after deactivate POST")
	}
}
