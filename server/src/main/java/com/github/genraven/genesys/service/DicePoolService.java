package com.github.genraven.genesys.service;

import com.github.genraven.genesys.configuration.GenesysTemplateCache;
import com.github.genraven.genesys.domain.equipment.ItemInstance;
import com.github.genraven.genesys.domain.equipment.ItemTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class DicePoolService {

    @Autowired
    private GenesysTemplateCache templateCache;

    @Autowired
    private CalculationService calculationService;


}
