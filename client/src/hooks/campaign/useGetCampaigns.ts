import type {Campaign} from "../../api/model";
import {CampaignStatus} from "../../api/model";
import {sampleParty} from "../../models/SampleParty.ts";
import {
    sampleAdversaries,
    sampleArchetypes,
    sampleCareers,
    sampleCriticalInjuries,
    sampleItems,
    sampleQualities,
    sampleSkills,
    sampleTalents,
} from "../../models/SampleCompendium.ts";

export function useGetCampaigns() {
    const data: Campaign[] = [
        {
            id: 'twilight-imperium',
            name: 'Twilight Imperium',
            party: sampleParty,
            compendium: {
                skills: sampleSkills,
                archetypes: sampleArchetypes,
                careers: sampleCareers,
                talents: sampleTalents,
                items: sampleItems,
                adversaries: sampleAdversaries,
                qualities: sampleQualities,
                criticalInjuries: sampleCriticalInjuries,
            },
            status: CampaignStatus.Active
        }
    ];

    const isLoading = false;

    return {data, isLoading};
}
