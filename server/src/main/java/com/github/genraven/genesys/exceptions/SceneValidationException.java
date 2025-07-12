package com.github.genraven.genesys.exceptions;

import com.github.genraven.genesys.domain.error.Error;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SceneValidationException extends BaseException {

    public SceneValidationException(final List<Error> errors) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "Scene start context validation failed", errors);
    }
}
