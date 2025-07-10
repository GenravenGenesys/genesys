package com.github.genraven.genesys.domain.context.session;

import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.validator.ValidationGroups;

import java.util.List;

public interface SessionContext {
    Session getSession();

    List<Object> getValidatableParts();

    default List<Class<?>> getValidationGroups() {
        return List.of(ValidationGroups.PlayerValidation.class);
    }
}
