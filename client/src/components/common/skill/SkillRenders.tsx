import {
    type ActorSkill,
    ActorType,
    type ActorWeapon,
    type Player,
    type PlayerSkill,
    type Skill
} from "../../../api/model";
import type NonPlayerActor from "../../../models/actor/npc/NonPlayerActor.ts";
import type { SingleNonPlayerCharacter } from "../../../models/actor/npc/NonPlayerActor.ts";


export const renderBasicSkillName = (skill: Skill): string => {
    return !skill ? 'None' : skill.name;
}

export const renderSkillNames = (skills: Skill[]) => {
    if (skills === undefined || skills.length === 0) {
        return 'None'
    }
    const skillList = skills.sort((a, b) => a.name.localeCompare(b.name))
    let skillNames = ''
    for (let i = 0; i < skillList.length; i++) {
        skillNames = i !== skillList.length - 1 ? skillNames.concat(skillList[i].name + ', ') : skillNames.concat(skillList[i].name);
    }
    return skillNames
}

export const getActorSkill = (npc: NonPlayerActor, skill: Skill): ActorSkill => {
    const skillName = skill.name;

    switch (npc.type) {
        // case ActorType.Minion: {
        //     const minion = npc as Minion;
        //     const actorSkill = minion.skills.find(skill => skill.name === skillName);
        //     if (actorSkill) {
        //         return { ...actorSkill, ranks: 0 } as ActorSkill;
        //     }
        //     break;
        // }

        case ActorType.Rival:
        case ActorType.Nemesis: {
            const single = npc as SingleNonPlayerCharacter;
            const actorSkill = single.skills.find(skill => skill.name === skillName);
            if (actorSkill) {
                return actorSkill as ActorSkill;
            }
            break;
        }
    }

    return {} as ActorSkill;
};

export const getPlayerSkill = (player: Player, weapon: ActorWeapon) => {
    const skillName = weapon.skill.name

    const skill = player.skills.find(skill => skill.name === skillName);
    if (skill) {
        return skill as PlayerSkill
    }
    return {} as PlayerSkill;
};