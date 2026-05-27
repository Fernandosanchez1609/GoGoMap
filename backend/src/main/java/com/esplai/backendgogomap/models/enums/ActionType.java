package com.esplai.backendgogomap.models.enums;

public enum ActionType {
    VISIT(5, "Visita a punto ODS"),
    REPORT(10, "Report de incidencia en punto ODS");

    private final int points;
    private final String description;

    ActionType(int points, String description){
        this.points = points;
        this.description = description;
    }

    public int getPoints() {
        return points;
    }

    public String getDescription() {
        return description;
    }
}
