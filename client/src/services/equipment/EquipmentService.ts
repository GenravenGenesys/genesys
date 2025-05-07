import {EquipmentPath} from "../RootPath";
import {Armor} from "../../models/equipment/Armor";
import {Gear} from "../../models/equipment/Gear";
import {Weapon} from "../../models/equipment/Weapon";

export default class EquipmentService {

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

    static async createGear(name: string): Promise<Gear> {
        return await fetch(EquipmentPath.Gear + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getGears(): Promise<Gear[]> {
        return await fetch(EquipmentPath.Gear)
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

    static async getGear(id: string): Promise<Gear> {
        return await fetch(EquipmentPath.Gear + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateGear(gear: Gear): Promise<Gear> {
        return await fetch(EquipmentPath.Gear + `${gear.id}`, {
            method: "PUT",
            body: JSON.stringify(gear),
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