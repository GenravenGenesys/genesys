package com.github.genraven.genesys.domain;

import com.github.genraven.genesys.domain.enums.Difficulty;
import com.github.genraven.genesys.domain.modifier.Modifier;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific Critical Injuries")
public class CriticalInjury {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @EnumValidator(enumClass = Difficulty.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Difficulty severity;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int min;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int max;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Modifier> modifiers = new ArrayList<>();
}
