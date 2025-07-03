package com.github.genraven.genesys.validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidatorImpl implements ConstraintValidator<EnumValidator, Object> {
    private final List<String> validValues = new ArrayList<>();

    @Override
    public void initialize(EnumValidator validator) {
        Arrays.stream(validator.enumClass().getEnumConstants())
                .forEach(value -> validValues.add(value.toString().toLowerCase()));
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        if (value instanceof String) {
            return validValues.contains(value.toString().toLowerCase());
        } else if(value instanceof List) {
            return ((List<?>) value).stream().noneMatch(object -> object == null || !validValues.contains(object.toString().toLowerCase()));
        } else {
            return false;
        }
    }

}
