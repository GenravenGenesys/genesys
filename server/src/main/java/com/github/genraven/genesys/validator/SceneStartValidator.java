package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.context.session.SessionStartSceneContext;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.exceptions.SceneValidationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.groups.Default;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class SceneStartValidator {

    private final Validator validator;

    public Mono<SessionStartSceneContext> validateSessionStartSceneContext(final SessionStartSceneContext context) {
        log.info("Validating SessionStartScene");
        final Set<ConstraintViolation<SessionStartSceneContext>> constraintViolations = validator.validate(context, Default.class, ValidationGroups.SceneStartValidation.class);
        final List<String> errorMessages = new ArrayList<>();
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            constraintViolations.forEach(error ->
                errorMessages.add(error.getMessage()));
        }

        if (!CollectionUtils.isEmpty(errorMessages)) {
            final List<Error> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(Error.builder().message(message).build()));
            return Mono.error(new SceneValidationException(errors));
        }
        return Mono.just(context);
    }
}
