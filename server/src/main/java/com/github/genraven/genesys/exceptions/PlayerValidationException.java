package com.github.genraven.genesys.exceptions;

import java.util.List;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class PlayerValidationException extends ResponseStatusException {
    private final List<String> errors;

    public PlayerValidationException(final List<String> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Player context validation failed");
        this.errors = errors;
    }
}
