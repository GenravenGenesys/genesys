import {Weapon} from "../../models/equipment/Weapon";
import {EquipmentPath} from "../RootPath";

export default class WeaponService {

    static async createWeapon(name: string): Promise<Weapon> {
        return await fetch(EquipmentPath.Weapon + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getWeapons(): Promise<Weapon[]> {
        return await fetch(EquipmentPath.Weapon)
            .then((res) => {
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
            })
    }

    static async getWeapon(id: string): Promise<Weapon> {
        return await fetch(EquipmentPath.Weapon + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateWeapon(weapon: Weapon): Promise<Weapon> {
        return await fetch(EquipmentPath.Weapon + `${weapon.id}`, {
            method: "PUT",
            body: JSON.stringify(weapon),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}