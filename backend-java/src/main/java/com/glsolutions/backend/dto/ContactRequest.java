package com.glsolutions.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 120, message = "Name must be between 2 and 120 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;

    @Size(max = 30, message = "Phone number is too long")
    private String phone;

    @NotBlank(message = "Company is required")
    @Size(min = 2, max = 150, message = "Company must be between 2 and 150 characters")
    private String company;

    @NotBlank(message = "Service is required")
    @Size(min = 2, max = 120, message = "Service must be between 2 and 120 characters")
    private String service;

    @NotBlank(message = "Message is required")
    @Size(min = 20, max = 4000, message = "Message must be between 20 and 4000 characters")
    private String message;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
