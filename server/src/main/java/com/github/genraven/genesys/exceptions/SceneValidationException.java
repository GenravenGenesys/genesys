package com.github.genraven.genesys.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class SceneValidationException extends RuntimeException {
    private final List<String> errors;

    public SceneValidationException(final List<String> errors) {
        super("Scene start context validation failed");
        this.errors = errors;
    }
}
