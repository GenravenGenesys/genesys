package com.github.genraven.genesys.controller;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public abstract class AbstractController {

    protected URI getURI(final String name) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(name).toUri();
    }
}
