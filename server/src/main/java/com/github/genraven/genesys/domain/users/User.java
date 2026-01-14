package com.github.genraven.genesys.domain.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "users")
public record User(@Id String id, String username, Set<String> roles) {}
