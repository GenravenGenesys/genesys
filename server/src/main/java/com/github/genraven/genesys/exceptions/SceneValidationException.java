package com.github.genraven.genesys.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Getter
public class SceneValidationException extends ResponseStatusException {
    private final List<String> errors;

    public SceneValidationException(final List<String> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Scene start context validation failed");
        this.errors = errors;
    }
}
