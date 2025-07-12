package com.github.genraven.genesys.domain.talent;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.Activation;
import com.github.genraven.genesys.domain.Cost;
import com.github.genraven.genesys.domain.Limit;
import com.github.genraven.genesys.domain.common.Action;
import com.github.genraven.genesys.domain.modifier.Modifier;
import com.github.genraven.genesys.validator.EnumValidator;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "talents")
public class Talent {

    public Talent(final String name) {
        this.name = name;
    }

    protected Talent() {
    }

    @Id
    private String id;

    @NotNull
    private String name;

    @EnumValidator(enumClass = Activation.class)
    private Activation activation = Activation.PASSIVE;

    @EnumValidator(enumClass = Tier.class)
    private Tier tier = Tier.FIRST;

    @NotNull
    private boolean ranked = false;

    private String summary;
    private String description;
    private Cost cost = new Cost();
    private Limit limit = new Limit();
    private TalentSkills talentSkills = new TalentSkills();
    private TalentStats talentStats = new TalentStats();
    private TalentSkillCheck talentSkillCheck = new TalentSkillCheck();
    private Action action = new Action();
    private List<TalentRollModifiers> talentRollModifiers = new ArrayList<>();
    private List<Modifier> modifiers = new ArrayList<>();

    @AllArgsConstructor
    @Getter
    public enum Tier {
        FIRST("First"),
        SECOND("Second"),
        THIRD("Third"),
        FOURTH("Fourth"),
        FIFTH("Fifth");

        @JsonValue
        private final String label;
    }
}
