import type {AdversaryTemplate} from "../api/model";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General'
}

export const getRatings = (npc: AdversaryTemplate): string => {
    if (npc) {
        return combat + String(npc.ratings.combat) + social + String(npc.ratings.social) + general + String(npc.ratings.general);
    }
    return combat + 1 + social + 1 + general + 1;
}

export const combat = '[combat] ';
export const social = ' [social] ';
export const general = ' [general] ';