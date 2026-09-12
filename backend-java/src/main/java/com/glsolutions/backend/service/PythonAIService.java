package com.glsolutions.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Map;

@Service
public class PythonAIService {
    private final RestTemplate restTemplate;
    private final String aiBaseUrl;

    public PythonAIService(RestTemplateBuilder builder,
                           @Value("${app.ai.base-url:http://localhost:8000}") String aiBaseUrl) {
        this.aiBaseUrl = aiBaseUrl;
        this.restTemplate = builder
            .setConnectTimeout(Duration.ofSeconds(5))
            .setReadTimeout(Duration.ofSeconds(8))
            .build();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> analyzeLead(Map<String, Object> payload) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                aiBaseUrl + "/ai/analyze-lead",
                request,
                Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return response.getBody();
            }
        } catch (RestClientException e) {
            return Map.of(
                "leadId", payload.getOrDefault("leadId", ""),
                "classification", "UNAVAILABLE",
                "summary", "AI processing unavailable at the moment.",
                "recommendedService", "Not available",
                "priority", "MEDIUM",
                "status", "FAILED"
            );
        }

        return Map.of(
            "leadId", payload.getOrDefault("leadId", ""),
            "classification", "UNAVAILABLE",
            "summary", "AI processing unavailable at the moment.",
            "recommendedService", "Not available",
            "priority", "MEDIUM",
            "status", "FAILED"
        );
    }

    public Map<String, Object> generateChatReply(String message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, String> payload = Map.of("message", message);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                aiBaseUrl + "/chat",
                request,
                Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                if (Boolean.TRUE.equals(body.get("success")) || "SUCCESS".equalsIgnoreCase(String.valueOf(body.get("status")))) {
                    return Map.of(
                        "success", true,
                        "reply", body.getOrDefault("reply", "Thanks for your message. Tell us what you are trying to build and we can help identify the right direction."),
                        "status", "SUCCESS"
                    );
                }
            }
        } catch (RestClientException e) {
            return Map.of(
                "success", false,
                "reply", "Sorry, I couldn't process that right now. Please try again or contact our team directly.",
                "status", "FAILED"
            );
        }

        return Map.of(
            "success", false,
            "reply", "Sorry, I couldn't process that right now. Please try again or contact our team directly.",
            "status", "FAILED"
        );
    }
}
