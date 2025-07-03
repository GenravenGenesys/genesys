package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.Stats;
import com.github.genraven.genesys.domain.actor.player.*;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.repository.actor.PlayerRepository;
import com.github.genraven.genesys.service.CampaignService;
import com.github.genraven.genesys.service.SkillService;
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
        return playerRepository.findById(id).map(player -> {
            player.getTotalPlayerStats();
            return player;
        });
    }

    public Mono<Player> createPlayer(final String name) {
        return skillService.getSkillsForCurrentCampaign().flatMap(skills -> {
            final Player player = new Player(new Actor(name));
            player.setSkills(skills.stream().map(PlayerSkill::new).collect(Collectors.toList()));
            return playerRepository.save(player);
        }).flatMap(savedPlayer -> {
            return campaignService.getCurrentCampaign().flatMap(campaign -> {
                campaign.getParty().getPlayers().add(savedPlayer);
                return campaignService.updateCampaign(campaign.getId(), campaign).thenReturn(savedPlayer);
            });
        });
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

    public Mono<Player> updatePlayerCharacteristic(final String id, final Characteristic characteristic) {
        return getPlayer(id).flatMap(player -> {
            switch (characteristic.getType()) {
                case BRAWN -> player.setBrawn(characteristic);
                case AGILITY -> player.setAgility(characteristic);
                case INTELLECT -> player.setIntellect(characteristic);
                case CUNNING -> player.setCunning(characteristic);
                case WILLPOWER -> player.setWillpower(characteristic);
                case PRESENCE -> player.setPresence(characteristic);
            }
            player.setExperience(spendInitialExperience(player.getExperience(), characteristic.getCurrent() * 10));
            return playerRepository.save(player);
        });
    }

    public Mono<Player> updatePlayerSkill(final String id, final PlayerSkill playerSkill) {
        return getPlayer(id).flatMap(player -> {
            player.getSkills().stream()
                    .filter(skill -> skill.getId().equals(playerSkill.getId())).findFirst()
                    .ifPresent(skill -> skill.setRanks(skill.getRanks() + 1));
            player.setExperience(spendInitialExperience(player.getExperience(), isCareerSkill(player.getCareer(), playerSkill) ? playerSkill.getRanks() * 5 : 5 + playerSkill.getRanks() * 5));
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
                    player.setExperience(spendInitialExperience(player.getExperience(), getExperienceFromRankedTalent(actorTalent)));
                }
            } else {
                final ActorTalent playerTalent = new ActorTalent(talent);
                player.getTalents().add(playerTalent);
                player.setExperience(spendInitialExperience(player.getExperience(), getExperienceFromUnrankedTalent(playerTalent)));
            }
            return playerRepository.save(player);
        });
    }

    private int getExperienceFromUnrankedTalent(final ActorTalent talent) {
        switch (talent.getTier()) {
            case FIRST -> {
                return 5;
            }
            case SECOND -> {
                return 10;
            }
            case THIRD -> {
                return 15;
            }
            case FOURTH -> {
                return 20;
            }
            case FIFTH -> {
                return 25;
            }
            default -> throw new IllegalStateException("Unexpected value: " + talent.getTier());
        }
    }

    private int getExperienceFromRankedTalent(final ActorTalent talent) {
        switch (talent.getTier()) {
            case FIRST -> {
                return talent.getRanks() * 5;
            }
            case SECOND -> {
                return 5 + talent.getRanks() * 5;
            }
            case THIRD -> {
                return 10 + talent.getRanks() * 5;
            }
            case FOURTH -> {
                return 15 + talent.getRanks() * 5;
            }
            case FIFTH -> {
                return 25;
            }
            default -> throw new IllegalStateException("Unexpected value: " + talent.getTier());
        }
    }

    private Experience spendInitialExperience(final Experience experience, final int change) {
        experience.setInitial(experience.getInitial() - change);
        experience.setAvailable(experience.getAvailable() - change);
        return experience;
    }
}
