package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.users.Membership;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface MembershipRepository extends ReactiveMongoRepository<Membership, String> {

    Mono<Membership> findByUserIdAndCampaignId(final String userId, final String campaignId);
}
