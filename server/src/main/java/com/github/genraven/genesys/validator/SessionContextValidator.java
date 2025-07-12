package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.context.session.SessionContext;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.exceptions.SceneValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class SessionContextValidator {

    private final BeanValidator beanValidator;

    public <T extends SessionContext> Mono<Scene> validateSession(T context, Function<T, Mono<Scene>> updateAction) {
        List<String> errorMessages = context.getValidatableParts().stream()
            .flatMap(part -> beanValidator.validate(part, context.getValidationGroups().toArray(new Class[0])).stream()).toList();

        if (!errorMessages.isEmpty()) {
            final List<com.github.genraven.genesys.domain.error.Error> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(Error.builder().message(message).build()));
            return Mono.error(new SceneValidationException(errors));
        }

        return updateAction.apply(context);
    }
}
