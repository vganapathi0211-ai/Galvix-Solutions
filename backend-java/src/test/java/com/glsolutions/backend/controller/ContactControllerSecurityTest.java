package com.glsolutions.backend.controller;

import com.glsolutions.backend.service.ExcelLeadService;
import com.glsolutions.backend.service.LeadIdService;
import com.glsolutions.backend.service.PythonAIService;
import com.glsolutions.backend.service.WhatsAppService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeadIdService leadIdService;

    @MockBean
    private ExcelLeadService excelLeadService;

    @MockBean
    private PythonAIService pythonAIService;

    @MockBean
    private WhatsAppService whatsAppService;

    @Test
    void chatEndpointAllowsMessagesWithoutAuthentication() throws Exception {
        when(pythonAIService.generateChatReply(any())).thenReturn(Map.of(
            "success", true,
            "reply", "We can help with that.",
            "status", "SUCCESS"
        ));

        mockMvc.perform(post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"messages\":[{\"role\":\"user\",\"content\":\"What services do you offer?\"},{\"role\":\"assistant\",\"content\":\"We help with websites and AI.\"},{\"role\":\"user\",\"content\":\"I need a website\"}]}'"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.reply").value("We can help with that."));
    }
}
