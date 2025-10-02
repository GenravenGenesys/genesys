package com.github.genraven.genesys.validator.player;

import com.github.genraven.genesys.domain.context.player.PlayerCreationResetExperienceContext;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.exceptions.PlayerValidationException;
import com.github.genraven.genesys.validator.ValidationGroups;
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
public class PlayerCreationResetExperienceContextValidator {

    private final Validator validator;

    public Mono<PlayerCreationResetExperienceContext> validate(final PlayerCreationResetExperienceContext context) {
        log.info("Validating PlayerCreationSkillUpdate");
        final Set<ConstraintViolation<PlayerCreationResetExperienceContext>> constraintViolations = validator.validate(context, Default.class, ValidationGroups.PlayerCreationValidation.class);
        final List<String> errorMessages = new ArrayList<>();
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            constraintViolations.forEach(error ->
                    errorMessages.add(error.getMessage()));
        }

        if (!CollectionUtils.isEmpty(errorMessages)) {
            final List<com.github.genraven.genesys.domain.error.Error> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(Error.builder().message(message).build()));
            return Mono.error(new PlayerValidationException(errors));
        }
        return Mono.just(context);
    }
}
