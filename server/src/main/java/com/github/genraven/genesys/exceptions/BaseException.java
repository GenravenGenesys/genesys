package com.github.genraven.genesys.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;
import com.github.genraven.genesys.domain.error.Error;

import java.util.List;

@Getter
public abstract class BaseException extends ResponseStatusException {
    private final List<Error> errors;

    public BaseException(final HttpStatusCode status, final String reason, final List<Error> errors) {
        super(status, reason);
        this.errors = errors;
    }
}
