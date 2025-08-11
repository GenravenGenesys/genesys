package com.github.genraven.genesys.validator.player;

import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.context.player.PlayerCreationSkillUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationTalentUpdateContext;
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
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class PlayerCreationTalentUpdateContextValidator {

    private final Validator validator;

    public Mono<PlayerCreationTalentUpdateContext> validatePlayerCreationTalentUpdateContext(final PlayerCreationTalentUpdateContext context) {
        log.info("Validating PlayerCreationTalentUpdate");

        final List<String> errorMessages = new ArrayList<>();
        final Set<ConstraintViolation<PlayerCreationTalentUpdateContext>> violations =
                validator.validate(context, Default.class, ValidationGroups.PlayerCreationValidation.class);

        if (!CollectionUtils.isEmpty(violations)) {
            violations.forEach(v -> errorMessages.add(v.getMessage()));
        }

        final Player player = context.player();
        final ActorTalent talent = (ActorTalent) context.talent();

        if (player != null && talent != null) {
            int requiredExperience = 0;

            if (!talent.isRanked()) {
                requiredExperience = PlayerExperienceUtil.getExperienceFromUnrankedTalent(talent);
            } else {
                ActorTalent rankedTalent = player.getTalents().stream()
                        .filter(t -> t.getId().equals(talent.getId()))
                        .findFirst()
                        .orElse(null);

                if (rankedTalent == null) {
                    errorMessages.add("Ranked talent not found in player's talent list.");
                } else if (rankedTalent.getRanks() >= 5) {
                    errorMessages.add("Talent is already at max ranks.");
                } else {
                    rankedTalent.setRanks(rankedTalent.getRanks() + 1);
                    requiredExperience = PlayerExperienceUtil.getExperienceFromRankedTalent(rankedTalent);
                }
            }

            int availableExperience = player.getExperience().getAvailable();
            if (requiredExperience > availableExperience) {
                errorMessages.add(String.format(
                        "Insufficient experience: required %d but only %d available.",
                        requiredExperience, availableExperience
                ));
            }
        }

        if (!errorMessages.isEmpty()) {
            List<Error> errors = errorMessages.stream()
                    .map(msg -> Error.builder().message(msg).build())
                    .collect(Collectors.toList());
            return Mono.error(new PlayerValidationException(errors));
        }

        return Mono.just(context);
    }

}
