package com.github.genraven.genesys.configuration;

import com.github.genraven.genesys.domain.campaign.encounter.Participant;
import com.github.genraven.genesys.domain.campaign.encounter.PendingRollState;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory store for all live encounter state.
 *
 * <p><b>Participant map</b> – holds the mutable Participant objects for every
 * combatant in the active encounter.  Wounds and strain are updated here after
 * each resolved roll so every subsequent dice request sees current values.</p>
 *
 * <p><b>Pending roll map</b> – holds PendingRollState snapshots keyed by
 * rollSessionId, bridging the roll (Phase 1) and resolve (Phase 2) steps
 * without sending any game state back through the client.</p>
 */
@Slf4j
@Component
public class EncounterStateCache {

    /** Live participant state, keyed by Participant.id */
    private final Map<String, Participant> participants = new ConcurrentHashMap<>();

    /** Pending roll snapshots, keyed by rollSessionId */
    private final Map<String, PendingRollState> pendingRolls = new ConcurrentHashMap<>();

    // ─── Participant management ───────────────────────────────────────────────

    /**
     * Registers all participants at encounter-start, replacing any stale state.
     */
    public void registerParticipants(List<Participant> incoming) {
        incoming.forEach(p -> {
            participants.put(p.getId(), p);
            log.info("Registered participant [{}] id={}", p.getName(), p.getId());
        });
    }

    /**
     * Returns the live Participant for the given id, or empty if not found.
     */
    public Optional<Participant> getParticipant(String id) {
        return Optional.ofNullable(participants.get(id));
    }

    /**
     * Persists mutated participant state (wounds, strain, etc.) back into the cache.
     */
    public void updateParticipant(Participant participant) {
        participants.put(participant.getId(), participant);
        log.debug("Updated participant [{}] wounds={}/{}",
                participant.getName(),
                participant.getDerivedStats().getWoundThreshold().getCurrent(),
                participant.getDerivedStats().getWoundThreshold().getTotal());
    }

    // ─── Pending roll management ──────────────────────────────────────────────

    /**
     * Stores the post-roll snapshot so the resolve step can retrieve it without
     * the client re-sending any game data.
     */
    public void storePendingRoll(PendingRollState state) {
        pendingRolls.put(state.getRollSessionId(), state);
        log.info("Stored pending roll [{}] for attacker={} target={}",
                state.getRollSessionId(), state.getAttackerId(), state.getTargetId());
    }

    /**
     * Retrieves and removes the pending roll snapshot for one-time use during resolve.
     */
    public Optional<PendingRollState> consumePendingRoll(String rollSessionId) {
        PendingRollState state = pendingRolls.remove(rollSessionId);
        if (state == null) {
            log.warn("No pending roll found for rollSessionId={}", rollSessionId);
        }
        return Optional.ofNullable(state);
    }

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    /**
     * Clears all encounter state.  Call when an encounter ends.
     */
    public void clearEncounter() {
        participants.clear();
        pendingRolls.clear();
        log.info("Encounter state cleared.");
    }

    public Map<String, Participant> getAllParticipants() {
        return participants;
    }
}

