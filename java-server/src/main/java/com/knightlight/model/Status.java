package com.knightlight.model;

public class Status {
    private static final String STATUS_ON = "ON";
    private static final String STATUS_OFF = "OFF";

    private static final String SERVER_TYPE = "java spring boot";

    private static final String VERSION_NUMBER = "v1.0.0";

    public String status;
    public String server = SERVER_TYPE;
    public String version = VERSION_NUMBER;

    public Status(){
        this.status = STATUS_OFF;
    }

    public void setStatusOn(){
        this.status = STATUS_ON;
    }

    public void setStatusOff(){
        this.status = STATUS_OFF;
    }
}