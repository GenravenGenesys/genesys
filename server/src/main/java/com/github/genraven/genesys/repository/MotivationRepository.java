package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.motivation.Motivation;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotivationRepository extends ReactiveMongoRepository<Motivation, String> {
}
