package com.github.genraven.genesys.domain.motivation;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Schema(description = "Motivations for characters")
@Document(collection = "motivations")
public class Motivation {

    @Id
    @Schema(description = "Id")
    private String id;

    @Schema(description = "Type of Motivation")
    private Type type;
}
