package com.github.genraven.genesys.validator;

import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BeanValidator {

    private final Validator validator;

    public <T> List<String> validate(T object, Class<?>... groups) {
        return validator.validate(object, groups).stream()
            .map(v -> v.getPropertyPath() + ": " + v.getMessage())
            .toList();
    }
}