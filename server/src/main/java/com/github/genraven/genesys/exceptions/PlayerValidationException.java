package com.github.genraven.genesys.exceptions;

import java.util.List;

import lombok.Getter;

@Getter
public class PlayerValidationException extends RuntimeException {
    private final List<String> errors;

    public PlayerValidationException(final List<String> errors) {
        super("Player context validation failed");
        this.errors = errors;
    }
}
