package com.github.genraven.genesys.configuration.security;

import com.github.genraven.genesys.domain.users.UserRole;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class AuthorizationManager implements ReactiveAuthorizationManager<AuthorizationContext> {

    @Override
    public Mono<AuthorizationDecision> check(Mono<Authentication> auth, AuthorizationContext context) {
        String campaignId = context.getVariables().get("campaignId").toString();
        String characterId = context.getVariables().get("characterId").toString();

        return auth.flatMap(a -> {
            // 1. Fetch Membership for this user in this campaign
            return membershipRepo.findByUserIdAndCampaignId(a.getName(), campaignId)
                .flatMap(m -> {
                    if (m.role() == UserRole.ROLE_GM) return Mono.just(new AuthorizationDecision(true));

                    // 2. If Player, check if they own the specific characterId requested
                    if (characterId != null) {
                        return characterRepo.findById(characterId)
                            .map(c -> new AuthorizationDecision(c.ownerId().equals(a.getName())))
                            .defaultIfEmpty(new AuthorizationDecision(false));
                    }
                    return Mono.just(new AuthorizationDecision(true)); // General campaign access
                });
        }).defaultIfEmpty(new AuthorizationDecision(false));
    }
}
