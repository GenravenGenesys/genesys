import {EquipmentPath} from "../RootPath";
import {Gear} from "../../models/equipment/Gear";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class GearService {

    static async createGear(name: string): Promise<Gear> {
        return apiRequest(EquipmentPath.Gear + `${name}`, "POST");
    }

    static async getGears(): Promise<Gear[]> {
        return apiRequestList(EquipmentPath.Gear);
    }

    static async getGear(id: string): Promise<Gear> {
        return apiRequest(EquipmentPath.Gear + `${id}`);
    }

    static async updateGear(gear: Gear): Promise<Gear> {
        return apiRequest(EquipmentPath.Gear + `${gear.id}`, "PUT", gear);
    }
}