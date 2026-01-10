package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.error.Error;
import com.github.genraven.genesys.validator.EnumValidator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Setting-specific adversaries such as Nemeses, Rivals, and Minions")
public class AdversaryTemplate {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @EnumValidator(enumClass =  AdversaryType.class)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The type of adversary")
    private AdversaryType type;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The characteristics of the adversary")
    private Characteristics characteristics;

    @Valid
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, description = "The stats of the adversary")
    private DerivedStats derivedStats;

    private List<Error> errors;
}
