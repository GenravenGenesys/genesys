package com.github.genraven.genesys.auth;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.*;
import org.springframework.security.web.server.context.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class JwtSecurityContextRepository implements ServerSecurityContextRepository {
    private final JwtReactiveAuthenticationManager authManager;

    public JwtSecurityContextRepository(JwtReactiveAuthenticationManager authManager) {
        this.authManager = authManager;
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange exchange) {
        String token = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (token != null && token.startsWith("Bearer ")) {
            Authentication auth = new UsernamePasswordAuthenticationToken(token.substring(7), token);
            return authManager.authenticate(auth).map(SecurityContextImpl::new);
        }
        return Mono.empty();
    }

    @Override
    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
        return Mono.empty();
    }
}

