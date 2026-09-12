package com.glsolutions.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class LeadIdService {
    private final AtomicLong sequence = new AtomicLong(1L);

    public String generateLeadId() {
        String year = String.valueOf(LocalDate.now().getYear());
        long next = sequence.getAndIncrement();
        return String.format("GL-%s-%06d", year, next);
    }
}
