package com.knightlight.controller;

import com.knightlight.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @Autowired
    private Status status;

    @PostMapping(value = "/activate")
    public Status setStatusOn() {
        status.setStatusOn();
        return status;
    }

    @PostMapping(value = "/deactivate")
    public Status setStatusOff() {
        status.setStatusOff();
        return status;
    }

    @GetMapping(value = "/")
    public Status getStatus() {
        return status;
    }
}