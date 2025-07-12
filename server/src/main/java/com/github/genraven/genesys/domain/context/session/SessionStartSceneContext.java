package com.github.genraven.genesys.domain.context.session;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import lombok.Value;

import java.util.List;

@Value
public class SessionStartSceneContext implements SessionContext {
    Session session;
    Scene scene;

    @Override
    public List<Object> getValidatableParts() {
        return List.of(session, scene);
    }

    @Override
    public List<Class<?>> getValidationGroups() {
        return SessionContext.super.getValidationGroups();
    }
}
