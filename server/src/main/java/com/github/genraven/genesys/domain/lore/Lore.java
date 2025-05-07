package com.github.genraven.genesys.domain.lore;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

@Data
public class Lore {

    protected Lore() {
    }

    public Lore(final String name) {
        this.name = name;
    }

    @Id
    private String id;
    private String name;
    private Type type;

    @Getter
    @AllArgsConstructor
    public enum Type {
        ORGANIZATION("Organization");

        @JsonValue
        private final String type;
    }
}
