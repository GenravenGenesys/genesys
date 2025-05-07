import {RootPath} from "./RootPath";
import Archetype from "../models/actor/player/Archetype";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class ArchetypeService {
    static async getArchetypes(): Promise<Archetype[]> {
        return apiRequestList(RootPath.Archetype);
    }

    static async getArchetype(id: string): Promise<Archetype> {
        return apiRequest(RootPath.Archetype + `${id}`);
    }

    static async createArchetype(name: string): Promise<Archetype> {
        return apiRequest(RootPath.Archetype + `${name}`, "POST");
    }

    static async updateArchetype(archetype: Archetype): Promise<Archetype> {
        return apiRequest(RootPath.Archetype + `${archetype.id}`, "PUT", archetype);
    }
}