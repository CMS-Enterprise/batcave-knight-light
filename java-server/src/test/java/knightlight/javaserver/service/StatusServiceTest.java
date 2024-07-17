package knightlight.javaserver.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

public class StatusServiceTest {
  private StatusService statusService;

  @BeforeEach
  void setUp() {
    statusService = new StatusService();
  }

  @Test
  void testSetStatusActive() {
    Map<String, String> status = statusService.SetStatus(true);
    Assertions.assertNotNull(status, "Status object shouldn't be null");
    Assertions.assertEquals("ON", status.get("status"), "Status should be on after SetStatus true");
  }

  @Test
  void testSetStatusNotActive() {
    Map<String, String> status = statusService.SetStatus(false);
    Assertions.assertNotNull(status, "Status object shouldn't be null");
    Assertions.assertEquals("OFF", status.get("status"), "Status should be OFF after SetStatus false");
  }

  @Test
  void testGetStatusObject() {
    Map<String, String> status = statusService.GetStatusObject();
    Assertions.assertNotNull(status, "Status object should not be null");
    Assertions.assertEquals("OFF", status.get("status"), "Initial status should be OFF");
    Assertions.assertEquals("v1.0.0-rc.1", status.get("version"), "Version should be v1.0.0-rc.1");
    Assertions.assertEquals("java - SpringBoot", status.get("server"), "Server should be java - SpringBoot");
  }
}

