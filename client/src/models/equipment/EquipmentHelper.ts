import type Equipment from "./Equipment";
import {type Armor} from "./Armor";
import {type Weapon} from "./Weapon";
import type Quality from "../Quality";

export const renderPrice = (equipment: Equipment): string => {
    if (equipment) {
        return equipment.restricted ? equipment.price + '(R)' : String(equipment.price);
    }
    return '';
};

export const renderQualities = (equipment: Equipment): string => {
    let qualities = ''
    if (!(equipment.qualities === undefined || equipment.qualities.length > 0)) {
        qualities = 'None'
    } else {
        const qualityList = equipment?.qualities!.sort((a, b) => a.name.localeCompare(b.name))
        for (let i = 0; i < qualityList.length; i++) {
            const quality = qualityList[i];
            if (i !== qualityList.length - 1) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ', ')
            } else {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks)
            }
        }
    }
    return qualities
}

export const renderSoak = (armor: Armor): string => {
    if (armor) {
        return '+' + String(armor.soak);
    }
    return '';
};

export const renderActorDamage = (weapon: Weapon, brawn: number): string => {
    if (weapon) {
        return weapon.brawn ? String(weapon.damage + brawn) : String(weapon.damage);
    }
    return '';
}

export const renderDamage = (weapon: Weapon): string => {
    if (weapon) {
        return weapon.brawn ? 'Brawn + ' + weapon.damage : String(weapon.damage);
    }
    return '';
}

export const renderUsable = (quality: Quality): string => {
    if (quality) {
        if (quality.weapon === undefined && quality.armor === undefined) {
            return ''
        }
        let usable: string
        if (quality.weapon && !quality.armor) {
            usable = 'Weapons'
        } else if (quality.armor && !quality.weapon) {
            usable = 'Armor'
        } else {
            usable = 'Weapons and Armor'
        }
        return usable
    }
    return '';

}