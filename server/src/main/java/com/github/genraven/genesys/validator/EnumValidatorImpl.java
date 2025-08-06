package com.github.genraven.genesys.validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidatorImpl implements ConstraintValidator<EnumValidator, Object> {
    private Class<? extends Enum<?>> enumClass;

    @Override
    public void initialize(EnumValidator validator) {
        this.enumClass = validator.enumClass();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) return true;
        return enumClass.isInstance(value);
    }

}
