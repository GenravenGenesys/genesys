package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.context.player.PlayerCreationSkillUpdateContext;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.exceptions.PlayerValidationException;
import jakarta.validation.ConstraintViolation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.validation.Validator;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class PlayerCreationSkillUpdateContextValidator implements BaseValidator {

    private final Validator validator;

    public Mono<PlayerCreationSkillUpdateContext> validatePlayerCreationSkillUpdateContext(final PlayerCreationSkillUpdateContext context) {
        log.info("Validating PlayerCreationSkillUpdate");
        final Set<ConstraintViolation<PlayerCreationSkillUpdateContext>> constraintViolations = validator.validate(context);
        final List<String> errorMessages = new ArrayList<>();
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            constraintViolations.forEach(error ->
                errorMessages.add(error.getMessage()));
        }

//        if ()

        if (!CollectionUtils.isEmpty(errorMessages)) {
            final List<Error> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(Error.builder().message(message).build()));
            throw new PlayerValidationException(errors);
        }
        return Mono.just(context);
    }
}
