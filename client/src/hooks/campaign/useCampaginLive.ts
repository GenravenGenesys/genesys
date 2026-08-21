import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useGetCampaign} from "../../api/generated/campaign-controller/campaign-controller.ts";
import type { AdversaryTemplate, Archetype, Campaign, Career, ItemTemplate, Skill, Talent } from '../../api/model/index.ts';
import {useGetCampaigns} from "./useGetCampaigns.ts";

export function useCampaignLive(campaignId: string) {
    const queryClient = useQueryClient();

    const {data: mockCampaigns} = useGetCampaigns();
    const mockCampaign = mockCampaigns?.find(c => c.id === campaignId) ?? null;

    const { data, isLoading, error } = useGetCampaign(campaignId, {
        query: {enabled: !mockCampaign}
    });

    useEffect(() => {
        if (mockCampaign) return;

        const eventSource = new EventSource(`/api/campaigns/${campaignId}/stream`);
    
        eventSource.onmessage = (event) => {
            const updatedCampaign = JSON.parse(event.data);
            queryClient.setQueryData(['campaigns', campaignId], updatedCampaign);
        };
    
        return () => eventSource.close();
    }, [campaignId, queryClient, mockCampaign]);

    const campaign = mockCampaign ?? data?.data;
    // const campaign =
    //     {
    //         "id": "695e9ce4dcbe9bcbb04d09a4",
    //         "name": "Shadow",
    //         "party": {
    //             "players": []
    //         },
    //         "compendium": {
    //             "archetypes": [] as Archetype[],
    //             "careers": [] as Career[],
    //             "skills": [
    //                 {
    //                     "id": "74a0a4db-dee5-42a6-9335-af1655e17f27",
    //                     "name": "Brawl",
    //                     "characteristic": "Brawn",
    //                     "type": "Combat",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "68bec7b9-aace-487c-bf84-d036d3a02cba",
    //                     "name": "Charm",
    //                     "characteristic": "Presence",
    //                     "type": "Social",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "67b3fdd3-1002-416f-8d1f-ae356ec244db",
    //                     "name": "Leadership",
    //                     "characteristic": "Presence",
    //                     "type": "Social",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "22a018b6-2901-44fe-ab51-9abc2cd75508",
    //                     "name": "Stealth",
    //                     "characteristic": "Agility",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "b1bf2130-e98d-4c64-ac0c-58d16dec1c54",
    //                     "name": "Runecrafting",
    //                     "characteristic": "Willpower",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "a4e9bbe0-2821-4502-8900-2f4cb1bfa873",
    //                     "name": "Alchemy",
    //                     "characteristic": "Intellect",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "0b9bcbd9-368a-43cb-bb65-e48b58b15df1",
    //                     "name": "Athletics",
    //                     "characteristic": "Brawn",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "a9ca53c8-602a-4b5b-a5d4-8ab1e279cb61",
    //                     "name": "Cool",
    //                     "characteristic": "Presence",
    //                     "type": "General",
    //                     "initiative": true
    //                 },
    //                 {
    //                     "id": "2e26df21-29c1-46cb-abbe-869d4f7dde1f",
    //                     "name": "Coordination",
    //                     "characteristic": "Agility",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "011ae651-a516-4eaf-b1e6-80b016d5027b",
    //                     "name": "Discipline",
    //                     "characteristic": "Willpower",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "1db21f35-feb4-4257-a5e8-028edac6aebe",
    //                     "name": "Mechanics",
    //                     "characteristic": "Intellect",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "8d74d5e4-f686-49c0-a0d8-4051ae3feda5",
    //                     "name": "Medicine",
    //                     "characteristic": "Intellect",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "6ac5f604-fb84-4349-9c6f-4e00b90aa72b",
    //                     "name": "Perception",
    //                     "characteristic": "Cunning",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "4a8b778d-b680-4779-bbe2-aa1fb00dd12f",
    //                     "name": "Piloting",
    //                     "characteristic": "Agility",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "06e3d8e6-5a33-4314-9b0d-e2184bc4941d",
    //                     "name": "Resilience",
    //                     "characteristic": "Brawn",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "b2a9b724-c9ab-41bd-80f3-4da89ed0baac",
    //                     "name": "Riding",
    //                     "characteristic": "Agility",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "5ca6f8a2-cfe4-40f3-802c-2afd0bec57a7",
    //                     "name": "Skulduggery",
    //                     "characteristic": "Cunning",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "c6cf2cb7-8549-4206-9bcd-6af6374011f8",
    //                     "name": "Streetwise",
    //                     "characteristic": "Cunning",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "a0fece88-523f-4649-9a54-4bc289f92305",
    //                     "name": "Survival",
    //                     "characteristic": "Cunning",
    //                     "type": "General",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "54706a1a-c2eb-4ade-81b1-1e83f51460b6",
    //                     "name": "Vigilance",
    //                     "characteristic": "Willpower",
    //                     "type": "General",
    //                     "initiative": true
    //                 },
    //                 {
    //                     "id": "35fcf7f4-b652-486e-a5a4-d5d081d7eeac",
    //                     "name": "Coercion",
    //                     "characteristic": "Willpower",
    //                     "type": "Social",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "5b1b0342-c4f7-415c-b64f-7a8e310b46f0",
    //                     "name": "Deception",
    //                     "characteristic": "Cunning",
    //                     "type": "Social",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "01c58653-ea2e-424c-821b-5042b9f6a0f2",
    //                     "name": "Negotiation",
    //                     "characteristic": "Presence",
    //                     "type": "Social",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "d934bc01-853f-4e93-9081-e08c3a80bc37",
    //                     "name": "Gunnery",
    //                     "characteristic": "Agility",
    //                     "type": "Combat",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "c82b87e7-2651-45e9-989d-cbb8e3d8d187",
    //                     "name": "Melee",
    //                     "characteristic": "Brawn",
    //                     "type": "Combat",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "d31aa16e-4fc9-49f7-b072-9b7ac191a41f",
    //                     "name": "Ranged",
    //                     "characteristic": "Agility",
    //                     "type": "Combat",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "63618a23-a497-482c-a54a-4675d26fb232",
    //                     "name": "Mythology",
    //                     "characteristic": "Intellect",
    //                     "type": "Knowledge",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "5080e771-53fd-4974-abe2-eca02ce269ba",
    //                     "name": "Science",
    //                     "characteristic": "Intellect",
    //                     "type": "Knowledge",
    //                     "initiative": false
    //                 },
    //                 {
    //                     "id": "d63ffafd-fce3-4608-8355-6f6c8b92c96f",
    //                     "name": "Culture",
    //                     "characteristic": "Intellect",
    //                     "type": "Knowledge",
    //                     "initiative": false
    //                 }
    //             ] as Skill[],
    //             "talents": [] as Talent[],
    //             "items": [] as ItemTemplate[],
    //             "adversaries": [] as AdversaryTemplate[]
    //         }
    //     } as Campaign;
    // const isLoading = false;

    return {campaign, isLoading, error: Error};
}