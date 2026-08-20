package com.github.genraven.genesys.domain.equipment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "An instance of an item, which may be owned by an actor or exist in the world. This is distinct from the Item class, which represents the definition of an item type.")
public class ItemInstance {

    @NotEmpty
    private String id = UUID.randomUUID().toString();

    @NotEmpty
    private String templateId;

    @Min(1)
    @NotNull
    private int quantity = 1;

    @NotNull
    private Boolean equipped = false;
}