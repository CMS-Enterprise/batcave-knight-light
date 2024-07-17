package knightlight.javaserver.controller;

import knightlight.javaserver.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;

@RestController
public class StatusController {
  private final StatusService statusService;

  @Autowired
  public StatusController(StatusService statusService) {
    this.statusService = statusService;
  }

  @GetMapping("/activate")
  public Map<String, String> activate() {
    return statusService.SetStatus(true);
  }

  @GetMapping("/deactivate")
  public Map<String, String> deactivate() {
    return statusService.SetStatus(false);
  }

  @GetMapping("/status")
  public Map<String, String> status() {
    return statusService.GetStatusObject();
  }
}
