package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.*;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.context.player.PlayerCreationCharacteristicUpdateContext;
import com.github.genraven.genesys.domain.context.player.PlayerCreationSkillUpdateContext;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.repository.actor.PlayerRepository;
import com.github.genraven.genesys.service.CampaignService;
import com.github.genraven.genesys.service.SkillService;
import com.github.genraven.genesys.util.PlayerExperienceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SkillService skillService;
    private final CampaignService campaignService;

    public Flux<Player> getAllPlayers() {
        return playerRepository.findAll().map(player -> {
            player.getTotalPlayerStats();
            return player;
        });
    }

    public Mono<Player> getPlayer(final String id) {
        return playerRepository.findById(id);
    }

    public Mono<Player> createPlayer(final String name) {
        return skillService.getSkillsForCurrentCampaign().flatMap(skills -> {
            final Player player = new Player(new Actor(name));
            player.setSkills(skills.stream().map(PlayerSkill::new).collect(Collectors.toList()));
            return playerRepository.save(player);
        }).flatMap(savedPlayer -> campaignService.getCurrentCampaign().flatMap(campaign -> {
            campaign.getParty().getPlayers().add(savedPlayer);
            return campaignService.updateCampaign(campaign.getId(), campaign).thenReturn(savedPlayer);
        }));
    }

    public Mono<Player> updatePlayer(final String name, final Player player) {
        return getPlayer(name).map(existingPlayer -> {
            existingPlayer.setSkills(player.getSkills());
            existingPlayer.setTalents(player.getTalents());
            existingPlayer.setWeapons(player.getWeapons());
            existingPlayer.setArmors(player.getArmors());
            return existingPlayer;
        }).flatMap(playerRepository::save);
    }

    public Mono<Player> updatePlayerCareer(final String id, final Career career) {
        return getPlayer(id).flatMap(existingPlayer -> {
            existingPlayer.setCareer(career);
            existingPlayer.getSkills().forEach(playerSkill -> {
                playerSkill.setCareer(isCareerSkill(career, playerSkill));
                playerSkill.setRanks(0);
            });
            return playerRepository.save(existingPlayer);
        });
    }

    public Mono<Player> updatePlayerCareerSkills(final String id, final List<PlayerSkill> skills) {
        final List<String> ids = skills.stream().map(PlayerSkill::getId).toList();
        return getPlayer(id).flatMap(existingPlayer -> {
            getCareerSkills(existingPlayer).forEach(playerSkill -> playerSkill.setRanks(ids.contains(playerSkill.getId()) ? 1 : 0));
            return playerRepository.save(existingPlayer);
        });
    }

    private boolean isCareerSkill(final Career career, final PlayerSkill playerSkill) {
        return career.getSkills().stream().anyMatch(skill -> skill.getId().equals(playerSkill.getId()));
    }

    private List<PlayerSkill> getCareerSkills(final Player player) {
        return player.getSkills().stream().filter(PlayerSkill::isCareer).toList();
    }

    public Mono<Player> updatePlayerArchetype(final String id, final Archetype archetype) {
        return getPlayer(id).flatMap(existingPlayer -> {
            existingPlayer.setArchetype(archetype);
            existingPlayer.setBrawn(new Characteristic(Characteristic.Type.BRAWN, archetype.getBrawn()));
            existingPlayer.setAgility(new Characteristic(Characteristic.Type.AGILITY, archetype.getAgility()));
            existingPlayer.setIntellect(new Characteristic(Characteristic.Type.INTELLECT, archetype.getIntellect()));
            existingPlayer.setCunning(new Characteristic(Characteristic.Type.CUNNING, archetype.getCunning()));
            existingPlayer.setWillpower(new Characteristic(Characteristic.Type.WILLPOWER, archetype.getWillpower()));
            existingPlayer.setPresence(new Characteristic(Characteristic.Type.PRESENCE, archetype.getPresence()));
            existingPlayer.setWounds(new Stats(0, archetype.getWounds(), Stats.Type.WOUNDS));
            existingPlayer.setStrain(new Stats(0, archetype.getStrain(), Stats.Type.STRAIN));
            existingPlayer.updateAvailableExperience(archetype.getExperience());
            return playerRepository.save(existingPlayer);
        });
    }

    public Mono<Player> updatePlayerCharacteristic(final PlayerCreationCharacteristicUpdateContext context) {
        return Mono.just(context.player()).flatMap(player -> {
            switch (context.characteristic().getType()) {
                case BRAWN -> player.setBrawn(context.characteristic());
                case AGILITY -> player.setAgility(context.characteristic());
                case INTELLECT -> player.setIntellect(context.characteristic());
                case CUNNING -> player.setCunning(context.characteristic());
                case WILLPOWER -> player.setWillpower(context.characteristic());
                case PRESENCE -> player.setPresence(context.characteristic());
            }
            player.setExperience(spendInitialExperience(player.getExperience(), PlayerExperienceUtil.getExperienceFromCharacteristicUpgrade(context.characteristic())));
            return playerRepository.save(player);
        });
    }

    public Mono<Player> updatePlayerSkill(final PlayerCreationSkillUpdateContext context) {
        return Mono.just(context.player()).flatMap(player -> {
            player.getSkills().stream()
                .filter(skill -> skill.getId().equals(context.playerSkill().getId())).findFirst()
                .ifPresent(skill -> skill.setRanks(context.playerSkill().getRanks()));
            player.setExperience(spendInitialExperience(player.getExperience(), PlayerExperienceUtil.getExperienceFromSkillUpgrade(context.playerSkill())));
            return playerRepository.save(player);
        });
    }

    public Mono<Player> updatePlayerTalent(final String id, final Talent talent) {
        return getPlayer(id).flatMap(player -> {
            final Optional<ActorTalent> talentOptional = player.getTalents().stream()
                .filter(actorTalent -> actorTalent.getId().equals(talent.getId()))
                .findFirst();

            if (talentOptional.isPresent()) {
                final ActorTalent actorTalent = talentOptional.get();
                if (!actorTalent.isRanked()) {
                    return Mono.error(new IllegalArgumentException("Talent is not ranked."));
                } else {
                    actorTalent.setRanks(actorTalent.getRanks() + 1);
                    player.setExperience(spendInitialExperience(player.getExperience(), PlayerExperienceUtil.getExperienceFromRankedTalent(actorTalent)));
                }
            } else {
                final ActorTalent playerTalent = new ActorTalent(talent);
                player.getTalents().add(playerTalent);
                player.setExperience(spendInitialExperience(player.getExperience(), PlayerExperienceUtil.getExperienceFromUnrankedTalent(playerTalent)));
            }
            return playerRepository.save(player);
        });
    }

    private Experience spendInitialExperience(final Experience experience, final int change) {
        experience.setInitial(experience.getInitial() - change);
        experience.setAvailable(experience.getAvailable() - change);
        return experience;
    }
}
