/**
 * An endpoint controller for health checks.
 */
package knightlight.javaserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

  @GetMapping("/health")
  public Map<String, String> healthCheck() {
    Map<String, String> response = new HashMap<>();
    response.put("health", "ok");
    return response;
  }
}
