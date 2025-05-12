import {Weapon} from "../../models/equipment/Weapon";
import {EquipmentPath} from "../RootPath";
import {apiRequest, apiRequestList} from "../ApiRequest";

export default class WeaponService {

    static async createWeapon(name: string): Promise<Weapon> {
        return apiRequest(EquipmentPath.Weapon + `${name}`, "POST");
    }

    static async getWeapons(): Promise<Weapon[]> {
        return apiRequestList(EquipmentPath.Weapon);
    }

    static async getWeapon(id: string): Promise<Weapon> {
        return apiRequest(EquipmentPath.Weapon + `${id}`);
    }

    static async updateWeapon(weapon: Weapon): Promise<Weapon> {
        return apiRequest(EquipmentPath.Weapon + `${weapon.id}`, "PUT", weapon);
    }
}