package com.github.genraven.genesys.exceptions;

import java.util.List;

import com.github.genraven.genesys.domain.error.GenesysError;
import org.springframework.http.HttpStatus;

public class PlayerValidationException extends BaseException {
    public PlayerValidationException(final List<GenesysError> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Player context validation failed", errors);
    }
}
