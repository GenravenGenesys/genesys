package com.github.genraven.genesys.domain.actor.adversary;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Instance of an Adversary")
public class AdversaryInstance {
    private String id = UUID.randomUUID().toString();

    private String templateId;
}
