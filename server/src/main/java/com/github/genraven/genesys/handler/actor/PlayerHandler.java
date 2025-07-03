package com.github.genraven.genesys.handler.actor;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.handler.BaseHandler;
import com.github.genraven.genesys.service.actor.PlayerService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
@RequiredArgsConstructor
public class PlayerHandler extends BaseHandler {

	private final PlayerService playerService;

	public Mono<ServerResponse> getAllPlayers(final ServerRequest serverRequest) {
		return playerService.getAllPlayers().collectList().flatMap(players -> {
			if (players.isEmpty()) {
				return ServerResponse.noContent().build();
			}
			return ServerResponse.ok()
					.contentType(MediaType.APPLICATION_JSON)
					.body(fromValue(players));
		});
	}

	public Mono<ServerResponse> getPlayer(final ServerRequest serverRequest) {
		final String name = serverRequest.pathVariable(NAME);
		return playerService.getPlayer(name)
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> createPlayer(final ServerRequest serverRequest) {
		return playerService.createPlayer(serverRequest.pathVariable("playerName"))
				.flatMap(player -> ServerResponse.created(getURI(player.getName())).bodyValue(player));
	}

	public Mono<ServerResponse> updatePlayer(final ServerRequest serverRequest) {
		final String name = serverRequest.pathVariable(NAME);
		final Mono<Player> playerMono = serverRequest.bodyToMono(Player.class);
		return playerMono
				.flatMap(player -> playerService.updatePlayer(name, player))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerCareer(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<Career> careerMono = serverRequest.bodyToMono(Career.class);
		return careerMono
				.flatMap(career -> playerService.updatePlayerCareer(id, career))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerCareerSkills(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<List<PlayerSkill>> skillsMono = serverRequest.bodyToMono(new ParameterizedTypeReference<>() {
		});
		return skillsMono
				.flatMap(skills -> playerService.updatePlayerCareerSkills(id, skills))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerArchetype(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<Archetype> archetypeMono = serverRequest.bodyToMono(Archetype.class);
		return archetypeMono
				.flatMap(archetype -> playerService.updatePlayerArchetype(id, archetype))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerCharacteristic(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<Characteristic> characteristicMono = serverRequest.bodyToMono(Characteristic.class);
		return characteristicMono
				.flatMap(characteristic -> playerService.updatePlayerCharacteristic(id, characteristic))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerSkill(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<PlayerSkill> playerSkillMono = serverRequest.bodyToMono(PlayerSkill.class);
		return playerSkillMono
				.flatMap(playerSkill -> playerService.updatePlayerSkill(id, playerSkill))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}

	public Mono<ServerResponse> updatePlayerTalent(final ServerRequest serverRequest) {
		final String id = serverRequest.pathVariable(ID);
		final Mono<Talent> talentMono = serverRequest.bodyToMono(Talent.class);
		return talentMono
				.flatMap(talent -> playerService.updatePlayerTalent(id, talent))
				.flatMap(player -> ServerResponse.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(player)))
				.switchIfEmpty(ServerResponse.notFound().build());
	}
}
