package com.github.genraven.genesys.exceptions;

import com.github.genraven.genesys.domain.error.GenesysError;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SceneValidationException extends BaseException {

    public SceneValidationException(final List<GenesysError> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Scene start context validation failed", errors);
    }
}
