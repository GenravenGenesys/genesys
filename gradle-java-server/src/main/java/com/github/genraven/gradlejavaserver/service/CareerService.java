package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.actor.player.Career;
import com.github.genraven.gradlejavaserver.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CareerService {
    private final CareerRepository careerRepository;

    @Autowired
    public CareerService(final CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    public Flux<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    public Mono<Career> getCareer(final String name) {
        return careerRepository.findById(name);
    }

    public Mono<Career> createCareer(final String name) {
        return careerRepository.save(new Career(name));
    }

    public Mono<Career> updateCareer(final String name, final Career career) {
        return getCareer(name).map(car -> {
            car.setSkills(career.getSkills());
            car.setSettings(career.getSettings());
            return car;
        }).flatMap(careerRepository::save);
    }
}
