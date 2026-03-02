package com.github.genraven.genesys.validator;

import com.github.genraven.genesys.domain.actor.player.PlayerCharacter;
import com.github.genraven.genesys.domain.error.GenesysError;
import com.github.genraven.genesys.exceptions.PlayerValidationException;
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
public class PlayerCharacterValidator {

    private final Validator validator;

    public Mono<PlayerCharacter> validate(final PlayerCharacter context) {
        log.info("Validating GearContext");
        final Set<ConstraintViolation<PlayerCharacter>> constraintViolations = validator.validate(context, Default.class, ValidationGroups.PlayerCreationValidation.class);
        final List<String> errorMessages = new ArrayList<>();
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            constraintViolations.forEach(error ->
                    errorMessages.add(error.getMessage()));
        }

        if (!CollectionUtils.isEmpty(errorMessages)) {
            final List<GenesysError> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(GenesysError.builder().message(message).build()));
            return Mono.error(new PlayerValidationException(errors));
        }
        return Mono.just(context);
    }
}
