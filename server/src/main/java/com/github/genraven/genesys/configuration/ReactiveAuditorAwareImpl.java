package com.github.genraven.genesys.configuration;

import com.mongodb.lang.NonNull;
import org.springframework.data.domain.ReactiveAuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class ReactiveAuditorAwareImpl implements ReactiveAuditorAware<String> {

    @Override
    public @NonNull Mono<String> getCurrentAuditor() {
        return ReactiveSecurityContextHolder.getContext()
            .map(SecurityContext::getAuthentication)
            .map(Authentication::getPrincipal)
            .map(principal -> {
                if (principal instanceof UserDetails) {
                    return ((UserDetails) principal).getUsername();
                } else {
                    return principal.toString();
                }
            });
    }
}
