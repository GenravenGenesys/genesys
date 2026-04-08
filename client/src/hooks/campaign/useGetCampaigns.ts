import type {Campaign} from "../../api/model";
import {CampaignStatus} from "../../api/model";
import {sampleParty} from "../../models/SampleParty.ts";

export function useGetCampaigns() {
    const data: Campaign[] = [
        {
            id: 'twilight-imperium',
            name: 'Twilight Imperium',
            party: sampleParty,
            compendium: {
                skills: [],
                archetypes: [],
                careers: [],
                talents: [],
                items: [],
                adversaries: [],
                qualities: [],
                criticalInjuries: []
            },
            status: CampaignStatus.Active
        }
    ];

    const isLoading = false;

    return {data, isLoading};
}
