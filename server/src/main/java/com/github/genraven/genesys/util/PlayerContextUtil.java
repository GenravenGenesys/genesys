package com.github.genraven.genesys.util;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.context.PlayerContext;

@Component
public class PlayerContextUtil {
    private PlayerContextUtil() {}
    
    public static PlayerContext setPlayer(final PlayerContext playerContext, final Player player) {
        Optional.ofNullable(player).ifPresent(play -> {
            playerContext.setPlayer(play);
        });
        return playerContext;
    }
}
