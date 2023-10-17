import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getSetting} from "./SettingHelper.ts";

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