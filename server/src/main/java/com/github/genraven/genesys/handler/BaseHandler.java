package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.constants.CommonConstants;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public abstract class BaseHandler {

    protected URI getURI(final String name) {
        return UriComponentsBuilder.fromPath((CommonConstants.ID_PATH)).buildAndExpand(name).toUri();
    }
}
