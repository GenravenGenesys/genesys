import {RootPath} from "./RootPath";
import Career from "../models/actor/player/Career";
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class careerService {
    static async getCareers(): Promise<Career[]> {
        return apiRequestList(RootPath.Career);
    }

    static async getCareer(id: string): Promise<Career> {
        return apiRequest(RootPath.Career + `${id}`);
    }

    static async createCareer(name: string): Promise<Career> {
        return apiRequest(RootPath.Career + `${name}`, "POST");
    }

    static async updateCareer(career: Career): Promise<Career> {
        return apiRequest(RootPath.Career + `${career.id}`, "PUT", career);
    }
}