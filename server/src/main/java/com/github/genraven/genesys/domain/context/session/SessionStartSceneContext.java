package com.github.genraven.genesys.domain.context.session;

import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.validator.ValidationGroups;
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
        final List<Class<?>> validationGroups = SessionContext.super.getValidationGroups();
        validationGroups.add(ValidationGroups.SceneStartValidation.class);
        return validationGroups;
    }
}
