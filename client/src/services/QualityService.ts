import {RootPath} from "./RootPath";
import Quality from "../models/Quality";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return apiRequestList(RootPath.Qualities);
    }

    static async getQuality(id: string): Promise<Quality> {
        return apiRequest(RootPath.Qualities + `${id}`);
    }

    static async createQuality(name: string): Promise<Quality> {
        return apiRequest(RootPath.Qualities + `${name}`, "POST");
    }

    static async updateQuality(quality: Quality): Promise<Quality> {
        return apiRequest(RootPath.Qualities + `${quality.id}`, "PUT", quality);
    }
}