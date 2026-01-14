import {
    type CampaignEncounter,
    CampaignEncounterEncounterStatus,
    CampaignEncounterEncounterType, type CampaignScene, type CampaignSession,
    CampaignSessionStatus
} from "../../api/model";

export function useGetSessions(campaignId: string) {
    console.log("useGetSessions called for " + campaignId);

    const data = [{
        id: '123456',
        campaignId: '9596',
        sessionDate: '',
        party: {
            players: []
        },
        status: CampaignSessionStatus.Ready,
        scenes: [
            {
                sceneId: "s1",
                name: "Campaign 1",
                mapUrl: "",
                party: {
                    players: []
                },
                active: true,
                encounters: [
                    {
                        encounterId: "encounter1",
                        name: "Encounter 1",
                        npcIds: ["npc1", "npc2"],
                        initiativeOrder: [],
                        encounterType: CampaignEncounterEncounterType.Combat,
                        encounterStatus: CampaignEncounterEncounterStatus.Ready,
                        party: {
                            players: []
                        }
                    } as CampaignEncounter
                ]
            } as CampaignScene
        ],
    } as CampaignSession];

    const isLoading = false;

    return {data, isLoading, error: Error};
}