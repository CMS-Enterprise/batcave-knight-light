package knightlight.javaserver.controller;

import knightlight.javaserver.service.StatusService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;
import java.util.Map;

@ExtendWith(SpringExtension.class)
@WebMvcTest(StatusController.class)
public class StatusControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private StatusService statusService;

  @Test
  void testActivate() throws Exception {
    Map<String, String> response = new HashMap<>();
    response.put("status", "ON");
    Mockito.when(statusService.SetStatus(true)).thenReturn(response);

    mockMvc.perform(MockMvcRequestBuilders.get("/activate"))
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("ON"));
  }
  @Test
  void testDeactivate() throws Exception {
    Map<String, String> response = new HashMap<>();
    response.put("status", "OFF");
    Mockito.when(statusService.SetStatus(false)).thenReturn(response);

    mockMvc.perform(MockMvcRequestBuilders.get("/deactivate"))
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OFF"));
  }
  @Test
  void testStatus() throws Exception {
    Map<String, String> response = new HashMap<>();
    response.put("status", "OFF");
    Mockito.when(statusService.GetStatusObject()).thenReturn(response);

    mockMvc.perform(MockMvcRequestBuilders.get("/status"))
      .andExpect(MockMvcResultMatchers.status().isOk())
      .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OFF"));
  }
}

