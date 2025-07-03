package com.github.genraven.genesys.validator;

import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BeanValidator {

    private final Validator validator;

    public <T> List<String> validate(T object) {
        return validator.validate(object).stream()
            .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
            .toList();
    }
}