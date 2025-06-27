package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.repository.CareerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerService {
    private final CareerRepository careerRepository;
    private final SkillService skillService;

    public Flux<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    public Mono<Career> getCareer(final String name) {
        return careerRepository.findById(name);
    }

    public Mono<Career> createCareer(final String name) {
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> {
                    final List<Skill> careerSkills = skills.stream().limit(8).toList();
                    final Career career = new Career(name);
                    career.setSkills(careerSkills);
                    return careerRepository.save(career);
                });
    }

    public Mono<Career> updateCareer(final String name, final Career career) {
        return getCareer(name).map(car -> {
            car.setSkills(career.getSkills());
            return car;
        }).flatMap(careerRepository::save);
    }
}
