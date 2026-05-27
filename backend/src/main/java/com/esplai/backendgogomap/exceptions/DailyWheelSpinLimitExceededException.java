package com.esplai.backendgogomap.exceptions;

public class DailyWheelSpinLimitExceededException extends RuntimeException {
    public DailyWheelSpinLimitExceededException(String message) {
        super(message);
    }
}
