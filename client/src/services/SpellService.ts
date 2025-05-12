import {RootPath} from "./RootPath";
import Spell from "../models/spell/Spell";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class SpellService {

    static async getSpells(): Promise<Spell[]> {
        return apiRequestList(RootPath.Spell);
    }

    static async getSpell(id: string): Promise<Spell> {
        return apiRequest(RootPath.Spell + `${id}`);
    }

    static async createSpell(name: string): Promise<Spell> {
        return apiRequest(RootPath.Spell + `${name}`, "POST");
    }

    static async updateSpell(spell: Spell): Promise<Spell> {
        return apiRequest(RootPath.Spell + `${spell.id}`, "PUT", spell);
    }
}