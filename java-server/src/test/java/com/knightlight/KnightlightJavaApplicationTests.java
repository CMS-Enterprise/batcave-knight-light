package com.knightlight;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.containsString;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class KnightlightJavaApplicationTests {

	@Autowired
	MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void getStatusOff() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/")).andExpect(status().isOk()).andExpect(content().json("{status:OFF,server:\"java spring boot\",version:\"v1.0.0\"}"));

	}

	@Test
	void turnStatusOn() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/activate")).andExpect(status().isOk()).andExpect(content().json("{status:ON,server:\"java spring boot\",version:\"v1.0.0\"}"));
	}

	@Test
	void getStatusOn() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/activate")).andExpect(status().isOk());
		mockMvc.perform(MockMvcRequestBuilders.get("/")).andExpect(status().isOk()).andExpect(content().json("{status:ON,server:\"java spring boot\",version:\"v1.0.0\"}"));
	}

	@Test
	void turnStatusOff() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/deactivate")).andExpect(status().isOk()).andExpect(content().json("{status:OFF,server:\"java spring boot\",version:\"v1.0.0\"}"));
	}
}