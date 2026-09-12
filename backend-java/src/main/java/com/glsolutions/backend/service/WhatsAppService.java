package com.glsolutions.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class WhatsAppService {
    private final RestTemplate restTemplate;
    private final String accessToken;
    private final String phoneNumberId;
    private final String businessAccountId;
    private final String recipientNumber;
    private final String apiBaseUrl;

    public WhatsAppService(@Value("${app.whatsapp.access-token:}") String accessToken,
                          @Value("${app.whatsapp.phone-number-id:}") String phoneNumberId,
                          @Value("${app.whatsapp.business-account-id:}") String businessAccountId,
                          @Value("${app.whatsapp.recipient-number:}") String recipientNumber) {
        this.restTemplate = new RestTemplate();
        this.accessToken = accessToken;
        this.phoneNumberId = phoneNumberId;
        this.businessAccountId = businessAccountId;
        this.recipientNumber = recipientNumber;
        this.apiBaseUrl = "https://graph.facebook.com/v19.0";
    }

    public Map<String, Object> sendLeadNotification(Map<String, Object> leadData) {
        if (accessToken == null || accessToken.isBlank() || phoneNumberId == null || phoneNumberId.isBlank()) {
            return Map.of(
                "status", "NOT_CONFIGURED",
                "message", "WhatsApp credentials not configured."
            );
        }

        try {
            String message = buildMessage(leadData);
            String url = apiBaseUrl + "/" + phoneNumberId + "/messages";

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> payload = new HashMap<>();
            payload.put("messaging_product", "whatsapp");
            payload.put("to", recipientNumber.replace("+", ""));
            payload.put("type", "text");

            Map<String, Object> text = new HashMap<>();
            text.put("body", message);
            payload.put("text", text);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return Map.of(
                    "status", "SENT",
                    "sentAt", LocalDateTime.now(ZoneId.systemDefault()).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                    "messageId", response.getBody() != null ? response.getBody().getOrDefault("messages", "").toString() : ""
                );
            }

            return Map.of(
                "status", "FAILED",
                "message", "WhatsApp response was not successful."
            );
        } catch (RestClientException e) {
            return Map.of(
                "status", "FAILED",
                "message", e.getMessage()
            );
        }
    }

    private String buildMessage(Map<String, Object> leadData) {
        StringBuilder sb = new StringBuilder();
        sb.append("--------------------------------\n");
        sb.append("GL SOLUTIONS — NEW CLIENT ENQUIRY\n");
        sb.append("--------------------------------\n\n");
        sb.append("Lead ID:\n").append(leadData.getOrDefault("leadId", "N/A")).append("\n\n");
        sb.append("Date:\n").append(leadData.getOrDefault("date", "N/A")).append("\n");
        sb.append("Time:\n").append(leadData.getOrDefault("time", "N/A")).append("\n\n");
        sb.append("Name:\n").append(leadData.getOrDefault("name", "N/A")).append("\n");
        sb.append("Email:\n").append(leadData.getOrDefault("email", "N/A")).append("\n");
        sb.append("Phone:\n").append(leadData.getOrDefault("phone", "N/A")).append("\n");
        sb.append("Company:\n").append(leadData.getOrDefault("company", "N/A")).append("\n");
        sb.append("Service:\n").append(leadData.getOrDefault("service", "N/A")).append("\n");
        sb.append("Message:\n").append(leadData.getOrDefault("message", "N/A")).append("\n\n");
        sb.append("AI Classification:\n").append(leadData.getOrDefault("aiClassification", "UNAVAILABLE")).append("\n");
        sb.append("AI Summary:\n").append(leadData.getOrDefault("aiSummary", "Not available")).append("\n");
        sb.append("Lead Priority:\n").append(leadData.getOrDefault("leadPriority", "MEDIUM")).append("\n\n");
        sb.append("--------------------------------\n");
        sb.append("GL SOLUTIONS\n");
        sb.append("--------------------------------");
        return sb.toString();
    }
}
