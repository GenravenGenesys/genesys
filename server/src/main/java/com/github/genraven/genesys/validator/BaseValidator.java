package com.github.genraven.genesys.validator;

import java.util.ArrayList;
import java.util.List;

public interface BaseValidator {
    default <T> List<String> validate(T t) {
        return new ArrayList<>();
    }
}
