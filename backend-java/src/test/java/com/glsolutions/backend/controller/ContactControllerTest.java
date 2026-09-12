package com.glsolutions.backend.controller;

import com.glsolutions.backend.dto.ContactRequest;
import com.glsolutions.backend.dto.LeadResponse;
import com.glsolutions.backend.service.ExcelLeadService;
import com.glsolutions.backend.service.LeadIdService;
import com.glsolutions.backend.service.PythonAIService;
import com.glsolutions.backend.service.WhatsAppService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContactControllerTest {

    @Mock
    private LeadIdService leadIdService;

    @Mock
    private ExcelLeadService excelLeadService;

    @Mock
    private PythonAIService pythonAIService;

    @Mock
    private WhatsAppService whatsAppService;

    @InjectMocks
    private ContactController controller;

    @Test
    void submitContact_returnsSuccessWithGeneratedLeadId() throws Exception {
        when(leadIdService.generateLeadId()).thenReturn("GL-2026-000001");
        when(pythonAIService.analyzeLead(anyMap())).thenReturn(Map.of(
            "classification", "HIGH",
            "summary", "Strong fit for a premium website upgrade.",
            "recommendedService", "Brand Strategy",
            "priority", "HIGH"
        ));
        when(whatsAppService.sendLeadNotification(anyMap())).thenReturn(Map.of(
            "status", "SENT",
            "sentAt", "2026-09-12 16:45:00"
        ));

        ContactRequest request = new ContactRequest();
        request.setName("Alicia Stone");
        request.setEmail("alicia@example.com");
        request.setPhone("+15550001111");
        request.setCompany("Northwind Labs");
        request.setService("Brand Strategy");
        request.setMessage("We need a premium digital identity and website refresh for our growth phase.");

        ResponseEntity<?> response = controller.submitContact(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        LeadResponse body = (LeadResponse) response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("GL-2026-000001", body.getLeadId());
        verify(excelLeadService).saveLead(anyMap());
        verify(excelLeadService).updateLeadField(eq("GL-2026-000001"), eq("AI Classification"), eq("HIGH"));
        verify(whatsAppService).sendLeadNotification(anyMap());
    }

    @Test
    void chat_returnsBadRequestWhenMessageIsBlank() {
        ResponseEntity<?> response = controller.chat(Map.of("message", "   "));

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(false, body.get("success"));
    }

    @Test
    void chat_returnsSuccessWhenAiReplySucceeds() {
        when(pythonAIService.generateChatReply("Can you help with our website?")).thenReturn(Map.of(
            "success", true,
            "reply", "Absolutely, we can scope the right engagement.",
            "status", "SUCCESS"
        ));

        ResponseEntity<?> response = controller.chat(Map.of("message", "Can you help with our website?"));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(true, body.get("success"));
        assertEquals("success", body.get("status"));
        assertTrue(body.get("reply").toString().contains("Absolutely"));
    }

    @Test
    void chat_acceptsConversationHistoryPayload() {
        when(pythonAIService.generateChatReply(List.of(
            Map.of("role", "user", "content", "What services do you offer?"),
            Map.of("role", "assistant", "content", "We help with websites and AI."),
            Map.of("role", "user", "content", "Do you build mobile apps?")
        ))).thenReturn(Map.of(
            "success", true,
            "reply", "Yes, we also build mobile experiences and product experiences.",
            "status", "SUCCESS"
        ));

        ResponseEntity<?> response = controller.chat(Map.of("messages", List.of(
            Map.of("role", "user", "content", "What services do you offer?"),
            Map.of("role", "assistant", "content", "We help with websites and AI."),
            Map.of("role", "user", "content", "Do you build mobile apps?")
        )));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(true, body.get("success"));
        assertTrue(body.get("reply").toString().contains("mobile"));
    }
}
