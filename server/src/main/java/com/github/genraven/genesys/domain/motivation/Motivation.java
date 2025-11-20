package com.github.genraven.genesys.domain.motivation;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Schema(description = "Motivations for characters")
@Document(collection = "motivations")
public class Motivation {

    private Motivation(){
    }

    public Motivation(final String name) {
        this.name = name;
    }

    @Id
    @Schema(description = "Id of Motivation")
    private String id;

    @Schema(description = "Name of Motivation")
    private String name;

    @Schema(description = "Category of Motivation", example = "Flaw")
    private Type type;

    @Schema(description = "Description of the motivation")
    private String description;

    @Schema(description = "Minimum Dice Range Result")
    private int min;

    @Schema(description = "Maximum Dice Range Result")
    private int max;
}
