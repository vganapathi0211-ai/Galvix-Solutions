package com.glsolutions.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

class PythonAIServiceTest {

    private PythonAIService service;
    private MockRestServiceServer server;

    @BeforeEach
    void setUp() {
        service = new PythonAIService(new RestTemplateBuilder(), "http://localhost:8000");
        RestTemplate restTemplate = (RestTemplate) ReflectionTestUtils.getField(service, "restTemplate");
        server = MockRestServiceServer.bindTo(restTemplate).ignoreExpectOrder(true).build();
    }

    @Test
    void analyzeLead_returnsAiResponsePayload() {
        server.expect(requestTo("http://localhost:8000/ai/analyze-lead"))
            .andExpect(method(HttpMethod.POST))
            .andRespond(withSuccess(
                "{\"leadId\":\"GL-2026-000001\",\"classification\":\"HIGH\",\"summary\":\"Strong fit for a website redesign\",\"recommendedService\":\"Brand Strategy\",\"priority\":\"HIGH\",\"status\":\"SUCCESS\"}",
                MediaType.APPLICATION_JSON));

        Map<String, Object> response = service.analyzeLead(Map.of(
            "leadId", "GL-2026-000001",
            "name", "Alicia",
            "message", "We need a premium brand and website refresh."
        ));

        assertEquals("HIGH", response.get("classification"));
        assertEquals("Brand Strategy", response.get("recommendedService"));
        assertEquals("SUCCESS", response.get("status"));
        server.verify();
    }

    @Test
    void generateChatReply_returnsSuccessfulReplyWhenAiReturnsSuccess() {
        server.expect(requestTo("http://localhost:8000/chat"))
            .andExpect(method(HttpMethod.POST))
            .andRespond(withSuccess(
                "{\"success\":true,\"reply\":\"We can help scope the ideal solution.\",\"status\":\"SUCCESS\"}",
                MediaType.APPLICATION_JSON));

        Map<String, Object> response = service.generateChatReply("Can you help with our website?");

        assertEquals(true, response.get("success"));
        assertEquals("SUCCESS", response.get("status"));
        assertTrue(response.get("reply").toString().contains("scope"));
        server.verify();
    }

    @Test
    void generateChatReply_returnsFailureWhenPythonRespondsUnsuccessfully() {
        server.expect(requestTo("http://localhost:8000/chat"))
            .andExpect(method(HttpMethod.POST))
            .andRespond(withStatus(INTERNAL_SERVER_ERROR)
                .body("{\"detail\":\"AI service unavailable\"}")
                .contentType(MediaType.APPLICATION_JSON));

        Map<String, Object> response = service.generateChatReply("Test message");

        assertEquals(false, response.get("success"));
        assertEquals("FAILED", response.get("status"));
        assertTrue(response.get("reply").toString().contains("Sorry, I couldn't process that right now"));
        server.verify();
    }
}
