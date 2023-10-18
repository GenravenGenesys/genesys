import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getSetting} from "./SettingHelper.ts";
import {EquipmentQuality} from "../models/equipment/Quality.ts";
import {Weapon} from "../models/equipment/Weapon.ts";
import {getQuality} from "./QualityHelper.ts";
import {Skill} from "../models/Skill.ts";
import {retrieveSkill} from "./SkillHelper.ts";

export const retrieveWeapon = async (id: number): Promise<Weapon> => {
    const query = "SELECT * from weapon WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const weapon = results.rows[0] as Weapon;
    weapon.skill = await retrieveSkill(weapon['skill_id']) as Skill;
    delete weapon['skill_id'];
    weapon.settings = await getWeaponSettings(weapon.id) as Setting[];
    weapon.qualities = await getWeaponQualities(weapon.id) as EquipmentQuality[];
    return weapon;
}

export const getWeaponSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM weapon_settings WHERE weapon_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const getWeaponQualities = async (id: number): Promise<EquipmentQuality[]> => {
    const query = "SELECT * FROM weapon_qualities WHERE weapon_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const qualities = [];
    for (const quality of ids.rows as EquipmentQuality[]) {
        const equipmentQuality = await getQuality(quality['quality_id'], quality.ranks);
        qualities.push(equipmentQuality);
    }
    return qualities;
};

export const addQualityToWeapon = async (weapon_id: number, quality_id: number): Promise<EquipmentQuality[]> => {
    const weapon = await retrieveWeapon(weapon_id) as Weapon;
    const equipmentQualities= weapon.qualities;
    if (equipmentQualities.find(quality => quality.id === quality_id)) {
        const query = "UPDATE weapon_qualities SET ranks = ranks + 1 WHERE weapon_id = $2 AND quality_id = $3 RETURNING *;";
        const values = [weapon_id, quality_id];
        return (await pool.query(query, values)).rows as EquipmentQuality[];
    } else {
        const query = "INSERT INTO weapon_qualities (weapon_id, quality_id, ranks) VALUES ($1, $2, 1);";
        const values = [weapon_id, quality_id];
        await pool.query(query, values);
        const quality = await getQuality(quality_id, 1);
        equipmentQualities.push(quality);
    }
    return equipmentQualities;
};