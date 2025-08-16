package com.github.genraven.genesys.configuration;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

@Service
public record MessageService() {

    public Mono<Message> makePublicMessage() {
        final var text = "This is a public message.";

        return Mono.just(text).map(Message::from);
    }

    public Mono<Message> makeProtectedMessage() {
        final var text = "This is a protected message.";

        return Mono.just(text).map(Message::from);
    }

    public Mono<Message> makeAdminMessage() {
        final var text = "This is an admin message.";

        return Mono.just(text).map(Message::from);
    }
}
