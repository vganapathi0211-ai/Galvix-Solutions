package com.glsolutions.backend.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class ExcelLeadService {
    private final Path excelPath;
    private final ReentrantLock lock = new ReentrantLock();

    public ExcelLeadService(@Value("${app.storage.excel-file-path:./data/GL_Solutions_Leads.xlsx}") String excelFilePath) {
        this.excelPath = Paths.get(excelFilePath);
        createParentDirectoryIfNeeded();
        ensureWorkbookExists();
    }

    public Map<String, Object> saveLead(Map<String, Object> leadData) throws IOException {
        lock.lock();
        try {
            Workbook workbook = openWorkbook();
            Sheet sheet = workbook.getSheet("Client Leads");
            if (sheet == null) {
                sheet = workbook.createSheet("Client Leads");
                createHeaderRow(sheet);
            }

            Row row = sheet.createRow(sheet.getLastRowNum() + 1);
            int columnIndex = 0;
            for (String key : getHeaderOrder()) {
                Cell cell = row.createCell(columnIndex++);
                Object value = leadData.getOrDefault(key, "");
                setCellValue(cell, value);
            }

            autoSizeColumns(sheet);
            styleWorkbook(workbook, sheet);
            saveWorkbook(workbook);

            return Map.of("status", "saved", "path", excelPath.toString());
        } finally {
            lock.unlock();
        }
    }

    public void updateLeadField(String leadId, String field, String value) throws IOException {
        lock.lock();
        try {
            Workbook workbook = openWorkbook();
            Sheet sheet = workbook.getSheet("Client Leads");
            if (sheet == null) {
                return;
            }

            int headerRow = 0;
            Row header = sheet.getRow(headerRow);
            if (header == null) {
                return;
            }

            int leadIdCol = -1;
            for (int i = 0; i < header.getLastCellNum(); i++) {
                Cell cell = header.getCell(i);
                if (cell != null && fieldMatches(cell.toString(), "Lead ID")) {
                    leadIdCol = i;
                    break;
                }
            }

            if (leadIdCol == -1) {
                return;
            }

            int targetCol = -1;
            for (int i = 0; i < header.getLastCellNum(); i++) {
                Cell cell = header.getCell(i);
                if (cell != null && fieldMatches(cell.toString(), field)) {
                    targetCol = i;
                    break;
                }
            }

            if (targetCol == -1) {
                return;
            }

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                Cell leadCell = row.getCell(leadIdCol);
                if (leadCell != null && leadId.equals(leadCell.toString())) {
                    Cell targetCell = row.getCell(targetCol);
                    if (targetCell == null) {
                        targetCell = row.createCell(targetCol);
                    }
                    targetCell.setCellValue(value);
                    break;
                }
            }

            saveWorkbook(workbook);
        } finally {
            lock.unlock();
        }
    }

    public void createDashboardIfNeeded() throws IOException {
        lock.lock();
        try {
            Workbook workbook = openWorkbook();
            if (workbook.getSheet("Dashboard") != null) {
                return;
            }

            Sheet dashboard = workbook.createSheet("Dashboard");
            Row header = dashboard.createRow(0);
            header.createCell(0).setCellValue("Metric");
            header.createCell(1).setCellValue("Value");

            Row r1 = dashboard.createRow(1);
            r1.createCell(0).setCellValue("Total Leads");
            r1.createCell(1).setCellValue(0);

            Row r2 = dashboard.createRow(2);
            r2.createCell(0).setCellValue("High Priority Leads");
            r2.createCell(1).setCellValue(0);

            Row r3 = dashboard.createRow(3);
            r3.createCell(0).setCellValue("WhatsApp Success");
            r3.createCell(1).setCellValue(0);

            Row r4 = dashboard.createRow(4);
            r4.createCell(0).setCellValue("WhatsApp Failures");
            r4.createCell(1).setCellValue(0);

            dashboard.autoSizeColumn(0);
            dashboard.autoSizeColumn(1);
            saveWorkbook(workbook);
        } finally {
            lock.unlock();
        }
    }

    private void createParentDirectoryIfNeeded() {
        Path parent = excelPath.getParent();
        if (parent != null) {
            try {
                Files.createDirectories(parent);
            } catch (IOException e) {
                throw new RuntimeException("Could not create Excel storage directory", e);
            }
        }
    }

    private void ensureWorkbookExists() {
        File file = excelPath.toFile();
        if (!file.exists()) {
            lock.lock();
            try {
                Workbook workbook = new XSSFWorkbook();
                Sheet sheet = workbook.createSheet("Client Leads");
                createHeaderRow(sheet);
                styleWorkbook(workbook, sheet);
                saveWorkbook(workbook);
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize Excel workbook", e);
            } finally {
                lock.unlock();
            }
        }
    }

    private Workbook openWorkbook() throws IOException {
        File file = excelPath.toFile();
        if (!file.exists()) {
            ensureWorkbookExists();
        }
        try (FileInputStream inputStream = new FileInputStream(file)) {
            return new XSSFWorkbook(inputStream);
        }
    }

    private void saveWorkbook(Workbook workbook) throws IOException {
        try (FileOutputStream outputStream = new FileOutputStream(excelPath.toFile())) {
            workbook.write(outputStream);
        } finally {
            workbook.close();
        }
    }

    private void createHeaderRow(Sheet sheet) {
        Row headerRow = sheet.createRow(0);
        List<String> headers = getHeaderOrder();
        for (int i = 0; i < headers.size(); i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers.get(i));
        }

        CellStyle headerStyle = sheet.getWorkbook().createCellStyle();
        Font font = sheet.getWorkbook().createFont();
        font.setBold(true);
        headerStyle.setFont(font);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerRow.setRowStyle(headerStyle);

        for (int i = 0; i < headers.size(); i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        sheet.createFreezePane(0, 1);
    }

    private void styleWorkbook(Workbook workbook, Sheet sheet) {
        for (int i = 0; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            for (int j = 0; j < getHeaderOrder().size(); j++) {
                Cell cell = row.getCell(j);
                if (cell == null) {
                    cell = row.createCell(j);
                }
                CellStyle style = workbook.createCellStyle();
                style.setWrapText(true);
                style.setVerticalAlignment(VerticalAlignment.TOP);
                cell.setCellStyle(style);
            }
        }
    }

    private void autoSizeColumns(Sheet sheet) {
        for (int i = 0; i < getHeaderOrder().size(); i++) {
            sheet.autoSizeColumn(i);
        }
    }

    private List<String> getHeaderOrder() {
        List<String> headers = new ArrayList<>();
        headers.add("Lead ID");
        headers.add("Date");
        headers.add("Time");
        headers.add("Name");
        headers.add("Email");
        headers.add("Phone");
        headers.add("Company");
        headers.add("Service");
        headers.add("Message");
        headers.add("AI Classification");
        headers.add("AI Summary");
        headers.add("AI Recommended Service");
        headers.add("Lead Priority");
        headers.add("WhatsApp Status");
        headers.add("WhatsApp Sent At");
        headers.add("Processing Status");
        headers.add("Source");
        headers.add("Notes");
        return headers;
    }

    private void setCellValue(Cell cell, Object value) {
        if (value == null) {
            cell.setCellValue("");
            return;
        }
        if (value instanceof Number) {
            cell.setCellValue(((Number) value).doubleValue());
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if (value instanceof LocalDateTime) {
            cell.setCellValue(((LocalDateTime) value).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        } else {
            cell.setCellValue(String.valueOf(value));
        }
    }

    private boolean fieldMatches(String actual, String expected) {
        return actual != null && actual.trim().equalsIgnoreCase(expected.trim());
    }
}
