package com.github.genraven.genesys.domain.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "memberships")
@CompoundIndex(def = "{'userId': 1, 'campaignId': 1}", unique = true)
public record Membership(@Id String id, String userId, String campaignId, UserRole role) {}
