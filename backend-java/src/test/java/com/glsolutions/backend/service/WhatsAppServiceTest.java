package com.glsolutions.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class WhatsAppServiceTest {

    private WhatsAppService service;
    private MockRestServiceServer server;

    @BeforeEach
    void setUp() {
        service = new WhatsAppService("test-token", "123456789", "business-id", "+15551234567");
        RestTemplate restTemplate = (RestTemplate) ReflectionTestUtils.getField(service, "restTemplate");
        server = MockRestServiceServer.bindTo(restTemplate).ignoreExpectOrder(true).build();
    }

    @Test
    void sendLeadNotification_returnsNotConfiguredWhenCredentialsAreMissing() {
        WhatsAppService missingConfig = new WhatsAppService("", "", "", "+15551234567");

        Map<String, Object> response = missingConfig.sendLeadNotification(Map.of("leadId", "GL-2026-000001"));

        assertEquals("NOT_CONFIGURED", response.get("status"));
        assertTrue(response.get("message").toString().contains("not configured"));
    }

    @Test
    void sendLeadNotification_sendsPayloadAndReturnsSentStatus() {
        Map<String, Object> leadData = new HashMap<>();
        leadData.put("leadId", "GL-2026-000001");
        leadData.put("date", "2026-09-12");
        leadData.put("time", "16:45:00");
        leadData.put("name", "Alicia");
        leadData.put("email", "alicia@example.com");
        leadData.put("phone", "+15550001111");
        leadData.put("company", "Northwind");
        leadData.put("service", "Brand Strategy");
        leadData.put("message", "We need a premium marketing refresh.");
        leadData.put("aiClassification", "HIGH");
        leadData.put("aiSummary", "High-value project");
        leadData.put("leadPriority", "HIGH");

        server.expect(requestTo("https://graph.facebook.com/v19.0/123456789/messages"))
            .andExpect(method(HttpMethod.POST))
            .andRespond(withSuccess("{\"messages\":[{\"id\":\"wamid.123\"}]}", MediaType.APPLICATION_JSON));

        Map<String, Object> response = service.sendLeadNotification(leadData);

        assertEquals("SENT", response.get("status"));
        assertNotNull(response.get("sentAt"));
        assertTrue(response.get("messageId").toString().contains("wamid"));
        server.verify();
    }
}
