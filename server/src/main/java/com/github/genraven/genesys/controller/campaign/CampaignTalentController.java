package com.github.genraven.genesys.controller.campaign;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.talent.Talent;
import com.github.genraven.genesys.service.TalentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns/talents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Campaign Talent Controller", description = "Endpoints for managing campaign talents")
public class CampaignTalentController {

    private final TalentService talentService;

}
