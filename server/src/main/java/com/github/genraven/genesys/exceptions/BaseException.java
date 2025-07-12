package com.github.genraven.genesys.exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class BaseException extends ResponseStatusException {
    public BaseException(final HttpStatusCode status, final String reason) {
        super(status, reason);
    }
}
