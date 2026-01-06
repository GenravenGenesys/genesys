package com.github.genraven.genesys.mapper;

import com.github.genraven.genesys.domain.actor.npc.Minion;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.response.CharacterResponse;
import com.github.genraven.genesys.exceptions.BaseException;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ErrorResponseMapper {

    ErrorResponseMapper INSTANCE = Mappers.getMapper(ErrorResponseMapper.class);

    Player mapErrorsToPlayerResponse(final BaseException exception);

    Minion mapErrorsToMinionResponse(final BaseException exception);

    Rival mapErrorsToRivalResponse(final BaseException exception);

    Nemesis mapErrorsToNemesisResponse(final BaseException exception);

    CharacterResponse mapErrorsToCharacterResponse(final BaseException exception);
}
