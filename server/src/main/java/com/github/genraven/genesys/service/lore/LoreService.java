package com.github.genraven.genesys.service.lore;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.repository.lore.LoreRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class LoreService {

    private final LoreRepository loreRepository;

    public Flux<Lore> getAllLore() {
        return loreRepository.findAll();
    }
}
