import {apiRequestList} from "./ApiRequest";

export default class ModifierService {

    static async getModifiers(): Promise<string[]> {
        return apiRequestList('/modifiers/');
    }
}