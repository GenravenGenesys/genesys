package com.github.genraven.genesys.domain.context.session;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;

import java.util.List;

public record SessionStartSceneContext(Session session, Scene scene) implements SessionContext {
    @Override
    public List<Object> getValidatableParts() {
        return List.of(session, scene);
    }

    @Override
    public List<Class<?>> getValidationGroups() {
        return SessionContext.super.getValidationGroups();
    }
}
