package com.glsolutions.backend.controller;

import com.glsolutions.backend.dto.ContactRequest;
import com.glsolutions.backend.dto.LeadResponse;
import com.glsolutions.backend.service.ExcelLeadService;
import com.glsolutions.backend.service.LeadIdService;
import com.glsolutions.backend.service.PythonAIService;
import com.glsolutions.backend.service.WhatsAppService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4173", "http://localhost:4174", "http://localhost:4175", "http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class ContactController {

    private final LeadIdService leadIdService;
    private final ExcelLeadService excelLeadService;
    private final PythonAIService pythonAIService;
    private final WhatsAppService whatsAppService;

    public ContactController(LeadIdService leadIdService,
                            ExcelLeadService excelLeadService,
                            PythonAIService pythonAIService,
                            WhatsAppService whatsAppService) {
        this.leadIdService = leadIdService;
        this.excelLeadService = excelLeadService;
        this.pythonAIService = pythonAIService;
        this.whatsAppService = whatsAppService;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactRequest request) {
        try {
            String leadId = leadIdService.generateLeadId();
            String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String now = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

            Map<String, Object> leadData = new HashMap<>();
            leadData.put("Lead ID", leadId);
            leadData.put("Date", today);
            leadData.put("Time", now);
            leadData.put("Name", sanitize(request.getName()));
            leadData.put("Email", sanitize(request.getEmail()));
            leadData.put("Phone", sanitize(request.getPhone() == null ? "Not provided" : request.getPhone()));
            leadData.put("Company", sanitize(request.getCompany()));
            leadData.put("Service", sanitize(request.getService()));
            leadData.put("Message", request.getMessage());
            leadData.put("AI Classification", "PROCESSING");
            leadData.put("AI Summary", "Awaiting AI analysis");
            leadData.put("AI Recommended Service", "Not available");
            leadData.put("Lead Priority", "MEDIUM");
            leadData.put("WhatsApp Status", "PENDING");
            leadData.put("WhatsApp Sent At", "");
            leadData.put("Processing Status", "SAVED");
            leadData.put("Source", "Website");
            leadData.put("Notes", "");

            excelLeadService.saveLead(leadData);

            Map<String, Object> aiPayload = Map.of(
                "leadId", leadId,
                "name", request.getName(),
                "company", request.getCompany(),
                "service", request.getService(),
                "message", request.getMessage()
            );

            Map<String, Object> aiResult = pythonAIService.analyzeLead(aiPayload);

            excelLeadService.updateLeadField(leadId, "AI Classification", String.valueOf(aiResult.getOrDefault("classification", "UNAVAILABLE")));
            excelLeadService.updateLeadField(leadId, "AI Summary", String.valueOf(aiResult.getOrDefault("summary", "AI processing unavailable.")));
            excelLeadService.updateLeadField(leadId, "AI Recommended Service", String.valueOf(aiResult.getOrDefault("recommendedService", "Not available")));
            excelLeadService.updateLeadField(leadId, "Lead Priority", String.valueOf(aiResult.getOrDefault("priority", "MEDIUM")));
            excelLeadService.updateLeadField(leadId, "Processing Status", "COMPLETED");

            Map<String, Object> whatsappPayload = new HashMap<>(leadData);
            whatsappPayload.put("leadId", leadId);
            whatsappPayload.put("date", today);
            whatsappPayload.put("time", now);
            whatsappPayload.put("aiClassification", aiResult.getOrDefault("classification", "UNAVAILABLE"));
            whatsappPayload.put("aiSummary", aiResult.getOrDefault("summary", "AI processing unavailable."));
            whatsappPayload.put("leadPriority", aiResult.getOrDefault("priority", "MEDIUM"));

            Map<String, Object> whatsappResult = whatsAppService.sendLeadNotification(whatsappPayload);
            String whatsappStatus = String.valueOf(whatsappResult.getOrDefault("status", "FAILED"));
            excelLeadService.updateLeadField(leadId, "WhatsApp Status", whatsappStatus);
            if (whatsappResult.containsKey("sentAt")) {
                excelLeadService.updateLeadField(leadId, "WhatsApp Sent At", String.valueOf(whatsappResult.get("sentAt")));
            }

            return ResponseEntity.ok(new LeadResponse(true, leadId, "Your enquiry has been submitted successfully."));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "We couldn't save your enquiry right now. Please try again later."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "We couldn't submit your enquiry right now. Please try again or contact us directly."
            ));
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> request) {
        Object messagePayload = request.getOrDefault("messages", request.getOrDefault("message", ""));
        Object normalizedPayload;

        if (messagePayload instanceof java.util.List<?> messages) {
            normalizedPayload = messages.stream()
                .filter(Map.class::isInstance)
                .map(Map.class::cast)
                .map(item -> {
                    Object role = item.getOrDefault("role", "user");
                    Object content = item.getOrDefault("content", "");
                    return Map.of(
                        "role", String.valueOf(role),
                        "content", String.valueOf(content).trim()
                    );
                })
                .filter(item -> !String.valueOf(item.get("content")).isBlank())
                .toList();
        } else {
            String message = String.valueOf(messagePayload).trim();
            if (message.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Please enter a message before sending."
                ));
            }
            normalizedPayload = message;
        }

        if (normalizedPayload instanceof java.util.List<?> messageList && messageList.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Please enter a message before sending."
            ));
        }

        try {
            Map<String, Object> aiResult = pythonAIService.generateChatReply(normalizedPayload);
            if (Boolean.TRUE.equals(aiResult.get("success")) || "SUCCESS".equalsIgnoreCase(String.valueOf(aiResult.get("status")))) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "reply", aiResult.getOrDefault("reply", "Thanks for your message. Tell us what you are trying to build and we can help identify the right direction."),
                    "status", "success"
                ));
            }

            return ResponseEntity.status(503).body(Map.of(
                "success", false,
                "message", "Sorry, I couldn't process that right now. Please try again or contact our team directly."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of(
                "success", false,
                "message", "Sorry, I couldn't process that right now. Please try again or contact our team directly."
            ));
        }
    }

    @GetMapping("/leads")
    public ResponseEntity<?> getLeads() {
        return ResponseEntity.ok(Map.of("message", "Protected lead endpoint - requires authentication"));
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "gl-solutions-backend"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = error instanceof FieldError ? ((FieldError) error).getField() : error.getObjectName();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.badRequest().body(Map.of("success", false, "errors", errors));
    }

    private String sanitize(String value) {
        if (value == null) {
            return "";
        }
        return value.replaceAll("[\\r\\n]+", " ").trim();
    }
}
