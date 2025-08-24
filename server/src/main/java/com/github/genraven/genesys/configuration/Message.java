package com.github.genraven.genesys.configuration;

public record Message(String text) {

    public static Message from(final String text) {
        return new Message(text);
    }
}
