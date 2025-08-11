package com.github.genraven.genesys.domain.context.session;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import jakarta.validation.Valid;

public record SessionStartSceneContext(@Valid Session session, @Valid Scene scene) implements SessionContext {
}
