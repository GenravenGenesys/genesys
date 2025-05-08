import {RootPath} from "./RootPath";
import Injury from "../models/Injury";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return apiRequest(RootPath.Injury + `${name}`, "POST");
    }

    static async getInjury(id: string): Promise<Injury> {
        return apiRequest(RootPath.Injury + `${id}`);
    }

    static async updateInjury(injury: Injury): Promise<Injury> {
        return apiRequest(RootPath.Injury + `${injury.id}`, "PUT", injury);
    }

    static async getAllInjuries(): Promise<Injury[]> {
        return apiRequestList(RootPath.Injury);
    }
}