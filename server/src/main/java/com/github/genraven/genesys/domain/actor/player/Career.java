package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.skill.Skill;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
@Schema(description = "Setting-specific careers for player characters")
public class Career {

    @Id
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;

    @NotEmpty
    private String name;

    @Size(max = 8)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Skill> skills = new ArrayList<>();

    @Builder.Default
    @Schema(description = "Optional starting gear entries for this career; each entry offers one or more items to choose from")
    private List<StartingGearChoice> startingGear = new ArrayList<>();

    @Schema(description = "Optional starting money awarded to characters of this career")
    private StartingMoney startingMoney;
}
