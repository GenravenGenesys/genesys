package com.github.genraven.genesys.domain.lore;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.enums.LoreType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "organizations")
public class Organization extends Lore {

    protected Organization() {}

    public Organization(final Lore lore) {
        this.setName(lore.getName());
        this.setType(LoreType.ORGANIZATION);
    }

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private OrgType orgType;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int founded;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int disbanded;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String nickname;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String membersName;

    @Getter
    @AllArgsConstructor
    public enum OrgType {
        POLITICAL("Political"),
        SOCIAL("Social"),
        RELIGIOUS("Religious"),
        MILITARY("Military"),
        ACADEMIC("Academic");

        @JsonValue
        private final String label;
    }
}
