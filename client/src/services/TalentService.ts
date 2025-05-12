import Talent from "../models/Talent";
import {RootPath} from "./RootPath";
import {apiRequest, apiRequestList} from "./ApiRequest";


export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return apiRequestList(RootPath.Talent);
    }

    static async getTalent(id: string): Promise<Talent> {
        return apiRequest(RootPath.Talent + `${id}`);
    }

    static async createTalent(name: string): Promise<Talent> {
        return apiRequest(RootPath.Talent + `${name}`, "POST");
    }

    static async updateTalent(talent: Talent): Promise<Talent> {
        return apiRequest(RootPath.Talent + `${talent.id}`, "PUT", talent);
    }
}