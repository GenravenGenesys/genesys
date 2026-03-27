import com.github.genraven.genesys.domain.enums.CheckTarget;
import com.github.genraven.genesys.domain.enums.SkillType;
import lombok.Getter;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.common.GenesysSymbolResults;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.domain.enums.CheckContext;
import com.github.genraven.genesys.domain.enums.DiceType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class DiceModifier {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The type of die to add to the pool")
    private DiceType diceType;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "Number of dice to add")
    private int amount;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "The kind of check that triggers this modifier")
    private CheckContext checkContext;

    @Schema(description = "Restricts this modifier to checks of a particular skill type; null means any skill type")
    private SkillType skillType;

    @Schema(description = "Restricts this modifier to a specific skill; null means any skill matching skillType")
    private Skill skill;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED,
        description = "Whether this modifier applies to the character's own rolls or to rolls made against them")
    private CheckTarget checkTarget;
}

