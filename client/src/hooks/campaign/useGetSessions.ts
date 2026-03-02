import {
    type CampaignEncounter,
    CampaignEncounterEncounterStatus,
    CampaignEncounterEncounterType,
    CampaignEncounterStatus,
    CampaignEncounterType,
    type CampaignScene,
    type CampaignSession,
    CampaignSessionStatus
} from "../../api/model";
import {emptyAdversary} from "../../models/Template.ts";
import {sampleParty} from "../../models/SampleParty.ts";

export function useGetSessions(campaignId: string) {
    console.log("useGetSessions called for " + campaignId);

    // const data = [
    //     {
    //         id: 'Final Showdown',
    //         campaignId: '9596',
    //         sessionDate: 'January 26, 2026',
    //         party: {
    //             players: []
    //         },
    //         status: CampaignSessionStatus.Planning,
    //         scenes: [
    //             {
    //                 sceneId: "s1",
    //                 name: "Dark Fortress",
    //                 mapUrl: "",
    //                 party: {
    //                     players: []
    //                 },
    //                 active: true,
    //                 encounters: [
    //                     {
    //                         encounterId: "encounter1",
    //                         name: "Main Hall",
    //                         npcIds: ["npc1", "npc2"],
    //                         initiativeOrder: [],
    //                         encounterType: CampaignEncounterEncounterType.Combat,
    //                         encounterStatus: CampaignEncounterEncounterStatus.Ready,
    //                         party: {
    //                             players: []
    //                         }
    //                     } as CampaignEncounter
    //                 ]
    //             } as CampaignScene
    //         ],
    //         gm: 1,
    //         player: 4,
    //     } as CampaignSession,
    //     {
    //         id: 'Battle at Echo Ridge',
    //         campaignId: '9596',
    //         sessionDate: 'January 19, 2026',
    //         party: {
    //             players: []
    //         },
    //         status: CampaignSessionStatus.Ready,
    //         scenes: [
    //             {
    //                 sceneId: "s1",
    //                 name: "Echo Ridge",
    //                 mapUrl: "",
    //                 party: {
    //                     players: []
    //                 },
    //                 active: true,
    //                 encounters: [
    //                     {
    //                         encounterId: "encounter1",
    //                         name: "Encounter 1",
    //                         npcIds: ["npc1", "npc2"],
    //                         initiativeOrder: [],
    //                         encounterType: CampaignEncounterEncounterType.Combat,
    //                         encounterStatus: CampaignEncounterEncounterStatus.Ready,
    //                         party: {
    //                             players: []
    //                         }
    //                     } as CampaignEncounter
    //                 ]
    //             } as CampaignScene
    //         ],
    //         gm: 1,
    //         player: 4,
    //     } as CampaignSession,
    //     {
    //         id: 'Rescue Mission at Dawn',
    //         campaignId: '9596',
    //         sessionDate: 'January 19, 2026',
    //         party: {
    //             players: []
    //         },
    //         status: CampaignSessionStatus.Active,
    //         scenes: [
    //             {
    //                 sceneId: "s1",
    //                 name: "Bandit Hideout",
    //                 mapUrl: "",
    //                 party: {
    //                     players: []
    //                 },
    //                 active: true,
    //                 encounters: [
    //                     {
    //                         encounterId: "encounter1",
    //                         name: "Encounter 1",
    //                         npcIds: [emptyAdversary],
    //                         initiativeOrder: [],
    //                         encounterType: CampaignEncounterEncounterType.Combat,
    //                         encounterStatus: CampaignEncounterEncounterStatus.Ready,
    //                         party: {
    //                             players: []
    //                         }
    //                     } as CampaignEncounter
    //                 ]
    //             } as CampaignScene
    //         ],
    //         gm: 1,
    //         player: 4,
    //     } as CampaignSession,
    // ];

    const data = [
        {
            id: '1234',
            campaignId: '9596',
            sessionDate: 'January 19, 2026',
            party: sampleParty,
            status: CampaignSessionStatus.Active,
            scenes: [
                {
                    sceneId: "s1",
                    name: "Bandit Hideout",
                    mapUrl: "",
                    party: sampleParty,
                    active: true,
                    encounters: [
                        {
                            encounterId: "encounter1",
                            name: "Prison Break",
                            npcIds: [],
                            initiativeOrder: [],
                            type: CampaignEncounterType.Combat,
                            status: CampaignEncounterStatus.Ready,
                            party: sampleParty
                        } as CampaignEncounter
                    ]
                } as CampaignScene
            ],
            gm: 1,
            player: 4,
        } as CampaignSession,
    ];

    const isLoading = false;

    return {data, isLoading, error: Error};
}