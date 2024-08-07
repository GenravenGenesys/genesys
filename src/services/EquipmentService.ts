import axios from "axios";
import {EquipmentPath, EquipmentQualityPath, ModificationPath} from "./RootPath";
import {Armor} from "../models/equipment/Armor";
import {Gear} from "../models/equipment/Gear";
import {Weapon} from "../models/equipment/Weapon";
import Modifier from "../models/common/Modifier";
import {EquipmentQuality} from "../models/Quality";

export default class EquipmentService {

    static async createArmor(name: string): Promise<Armor> {
        return await fetch(EquipmentPath.Armor, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getArmors(): Promise<Armor[]> {
        return await fetch(EquipmentPath.Armor)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getArmor(id: string): Promise<Armor> {
        return await fetch(EquipmentPath.Armor + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateArmor(armor: Armor): Promise<Armor> {
        return await fetch(EquipmentPath.Armor + `${armor.armor_id}`, {method: 'PUT', body: JSON.stringify(armor)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addArmorModification(id: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationArmor + `${id}`, {
            method: 'POST',
            body: JSON.stringify(modifier)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addArmorQuality(id: string, quality: EquipmentQuality): Promise<EquipmentQuality> {
        return await fetch(EquipmentQualityPath.ArmorQuality + `${id}`, {
            method: 'POST',
            body: JSON.stringify(quality)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateArmorQuality(id: string, quality: EquipmentQuality): Promise<EquipmentQuality> {
        return await fetch(EquipmentQualityPath.ArmorQuality + `${id}`, {
            method: 'PUT',
            body: JSON.stringify(quality)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createWeapon(name: string): Promise<Weapon> {
        return await fetch(EquipmentPath.Weapon, {method: "POST", body: JSON.stringify({name: name})})
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
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
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
        return await fetch(EquipmentPath.Weapon + `${weapon.weapon_id}`, {method: 'PUT', body: JSON.stringify(weapon)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addWeaponModification(id: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationWeapon + `${id}`, {
            method: 'POST',
            body: JSON.stringify(modifier)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addWeaponQuality(id: string, quality: EquipmentQuality): Promise<EquipmentQuality> {
        return await fetch(EquipmentQualityPath.WeaponQuality + `${id}`, {
            method: 'POST',
            body: JSON.stringify(quality)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateWeaponQuality(id: string, quality: EquipmentQuality): Promise<EquipmentQuality> {
        return await fetch(EquipmentQualityPath.WeaponQuality + `${id}`, {
            method: 'PUT',
            body: JSON.stringify(quality)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createGear(name: string): Promise<Gear> {
        return await (await axios.post(EquipmentPath.Gear + name)).data
    }

    static async getGears(): Promise<Gear[]> {
        return await (await axios.get(EquipmentPath.Gear)).data
    }

    static async getGear(name: string): Promise<Gear> {
        return await (await axios.get(EquipmentPath.Gear + name)).data
    }

    static async updateGear(name: string, gear: Gear): Promise<Gear> {
        return await (await axios.put(EquipmentPath.Gear + name, gear)).data
    }
}