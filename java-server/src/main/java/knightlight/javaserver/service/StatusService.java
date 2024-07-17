package knightlight.javaserver.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatusService {
  public StatusService() {
    this.statusObject.put("status", "OFF");
    this.statusObject.put("version","v1.0.0-rc.1");
    this.statusObject.put("server","java - SpringBoot");
  }

  private final HashMap<String,String> statusObject = new HashMap<>();

  // var lightStatus = &StatusResponse{Status: "OFF", Version: "v1.0.0-rc", Server: "go"}
    public synchronized Map<String,String> SetStatus(boolean active) {
      if (active) {
        this.statusObject.put("status","ON");
      } else {
        this.statusObject.put("status","OFF");
      }
      return this.statusObject;
    }
    public synchronized Map<String,String> GetStatusObject() {
      return this.statusObject;
    }
}
