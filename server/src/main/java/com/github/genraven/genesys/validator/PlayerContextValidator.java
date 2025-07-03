package com.github.genraven.genesys.validator;

import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.context.PlayerContext;
import com.github.genraven.genesys.exceptions.PlayerValidationException;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class PlayerContextValidator {

    private final BeanValidator beanValidator;

    public <T extends PlayerContext> Mono<Player> validateUpdate(T context, Function<T, Mono<Player>> updateAction) {
        List<String> errors = context.getValidatableParts().stream()
                .flatMap(part -> beanValidator.validate(
                        part, context.getValidationGroups().toArray(new Class[0])).stream())
                .toList();

        if (!errors.isEmpty()) {
            return Mono.error(new PlayerValidationException(errors));
        }

        return updateAction.apply(context);
    }

}
