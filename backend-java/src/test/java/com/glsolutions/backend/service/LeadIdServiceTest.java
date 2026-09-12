package com.glsolutions.backend.service;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

class LeadIdServiceTest {

    private final LeadIdService service = new LeadIdService();

    @Test
    void generateLeadId_returnsYearBasedIdWithSequentialSuffix() {
        String firstId = service.generateLeadId();
        String secondId = service.generateLeadId();

        String expectedPattern = "GL-" + LocalDate.now().getYear() + "-\\d{6}";
        assertTrue(Pattern.matches(expectedPattern, firstId));
        assertTrue(Pattern.matches(expectedPattern, secondId));
        assertNotEquals(firstId, secondId);
        assertTrue(firstId.endsWith("000001"));
        assertTrue(secondId.endsWith("000002"));
    }

    @Test
    void generateLeadId_keepsPrefixAndYearStructureStable() {
        String leadId = service.generateLeadId();

        assertTrue(leadId.startsWith("GL-"));
        assertEquals(2, leadId.indexOf('-'));
        assertEquals(4, leadId.substring(3, 7).length());
        assertTrue(leadId.substring(3).contains("-"));
    }
}
