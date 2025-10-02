package com.github.genraven.genesys.validator.player;

import com.github.genraven.genesys.domain.context.player.PlayerCreationCharacteristicUpdateContext;
import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.exceptions.PlayerValidationException;
import com.github.genraven.genesys.util.PlayerExperienceUtil;
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
public class PlayerCreationCharacteristicUpdateContextValidator {

    private final Validator validator;

    public Mono<PlayerCreationCharacteristicUpdateContext> validate(final PlayerCreationCharacteristicUpdateContext context) {
        log.info("Validating PlayerCreationCharacteristicUpdate");
        final Set<ConstraintViolation<PlayerCreationCharacteristicUpdateContext>> constraintViolations = validator.validate(context, Default.class, ValidationGroups.PlayerCreationValidation.class);
        final List<String> errorMessages = new ArrayList<>();
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            constraintViolations.forEach(error ->
                errorMessages.add(error.getMessage()));
        }

        if (context.player() != null && context.characteristic() != null) {
            int requiredExperience = PlayerExperienceUtil.getExperienceFromCharacteristicUpgrade(context.characteristic());
            int availableExperience = context.player().getExperience().getAvailable();

            if (requiredExperience > availableExperience) {
                errorMessages.add(String.format(
                    "Insufficient experience: required %d but only %d available.",
                    requiredExperience, availableExperience
                ));
            }
        }

        if (!CollectionUtils.isEmpty(errorMessages)) {
            final List<com.github.genraven.genesys.domain.error.Error> errors = new ArrayList<>();
            errorMessages.forEach(message -> errors.add(Error.builder().message(message).build()));
            return Mono.error(new PlayerValidationException(errors));
        }
        return Mono.just(context);
    }
}
