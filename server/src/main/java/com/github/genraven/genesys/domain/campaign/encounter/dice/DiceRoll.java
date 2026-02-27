package com.github.genraven.genesys.domain.campaign.encounter.dice;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "dice_rolls")
@TypeAlias("DiceRoll")
public class DiceRoll {

    @Id
    private String id;

    @NotBlank
    @Indexed
    private String encounterId;

    @NotBlank
    @Indexed
    private String participantId;

    private String slotId;

    @NotBlank
    private String participantName;

    @Min(1)
    @Indexed
    private int round;

    @NotNull
    private DiceRollType rollType;

    @Valid
    @NotNull
    private DicePool dicePool = new DicePool();

    private List<RawDieResult> rawResults = new ArrayList<>();

    @NotNull
    private RollTotals totals = new RollTotals();

    @NotNull
    private NetResult netResult = new NetResult();

    private String skillUsed;
    private String actionId;
    private String notes;

    @CreatedDate
    @Indexed(expireAfter = "7d")
    private Instant createdAt = Instant.now();
}