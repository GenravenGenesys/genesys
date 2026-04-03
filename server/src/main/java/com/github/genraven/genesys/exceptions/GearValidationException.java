package com.github.genraven.genesys.exceptions;

import com.github.genraven.genesys.domain.error.GenesysError;
import org.springframework.http.HttpStatus;

import java.util.List;

public class GearValidationException extends BaseException {
    public GearValidationException(final List<GenesysError> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Gear context validation failed", errors);
    }
}
