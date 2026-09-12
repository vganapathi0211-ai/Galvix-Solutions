package com.glsolutions.backend.dto;

public class LeadResponse {
    private boolean success;
    private String leadId;
    private String message;

    public LeadResponse(boolean success, String leadId, String message) {
        this.success = success;
        this.leadId = leadId;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getLeadId() { return leadId; }
    public void setLeadId(String leadId) { this.leadId = leadId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
