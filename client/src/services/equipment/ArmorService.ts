import {Armor} from "../../models/equipment/Armor";
import {EquipmentPath} from "../RootPath";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class ArmorService {

    static async createArmor(name: string): Promise<Armor> {
        return apiRequest(EquipmentPath.Armor + `${name}`, "POST");
    }

    static async getArmors(): Promise<Armor[]> {
        return apiRequestList(EquipmentPath.Armor);
    }

    static async getArmor(id: string): Promise<Armor> {
        return apiRequest(EquipmentPath.Armor + `${id}`);
    }

    static async updateArmor(armor: Armor): Promise<Armor> {
        return apiRequest(EquipmentPath.Armor + `${armor.id}`, "PUT", armor);
    }
}