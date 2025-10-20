package com.appointmenthostpital.server.dtos;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class Notification {
    private String type;
    private String title;
    private String message;
    private String level;
    private LocalDateTime timestamp;
    private Map<String, Object> data;

    public Notification() {
        this.timestamp = LocalDateTime.now();
        this.data = new HashMap<>();
    }

    public Notification(String type, String title, String message, String level) {
        this();
        this.type = type;
        this.title = title;
        this.message = message;
        this.level = level;
    }

    public static Notification builder() {
        return new Notification();
    }

    public Notification type(String type) {
        this.type = type;
        return this;
    }

    public Notification title(String title) {
        this.title = title;
        return this;
    }

    public Notification message(String message) {
        this.message = message;
        return this;
    }

    public Notification level(String level) {
        this.level = level;
        return this;
    }

    public Notification addData(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
