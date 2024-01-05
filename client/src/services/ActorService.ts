import axios from "axios";
import Player, {PlayerSkill} from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {ActorPath} from "./Path";
import Rival from "../models/actor/npc/Rival";
import Actor, {ActorSkill} from "../models/actor/Actor";
import Minion, {GroupSkill} from "../models/actor/npc/Minion";
import {ActorWeapon} from "../models/equipment/Weapon";
import {ActorArmor} from "../models/equipment/Armor";
import Ability from "../models/Ability";
import NonPlayerActor from "../models/actor/npc/NonPlayerActor";
import Talent, {ActorTalent} from "../models/Talent";

export default class ActorService {

    static async getActors(): Promise<Actor[]> {
        return await (await axios.get(ActorPath.Actor)).data;
    }

    static async getNonPlayerCharacters(): Promise<NonPlayerActor[]> {
        return await (await axios.get(ActorPath.Npc)).data;
    }

    static async createPlayer(name: string): Promise<Player> {
        return await (await axios.post( ActorPath.Player + name)).data;
    }

    static async getPlayer(name: string): Promise<Player> {
        return await (await axios.get(ActorPath.Player + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get(ActorPath.Player)).data;
    }

    static async updatePlayer(name: string, player: Player): Promise<Player> {
        return await (await axios.put(ActorPath.Player + name, player)).data;
    }

    static async updatePlayerSkill(name: string, skill: PlayerSkill): Promise<Player> {
        return await (await axios.put(ActorPath.Player + name + '/skill', skill)).data;
    }

    static async addPlayerTalent(name: string, talent: ActorTalent): Promise<Player> {
        return await (await axios.put(ActorPath.Player + name + '/talent', talent)).data;
    }

    static async createPlayerWeapon(name: string, weapon: ActorWeapon): Promise<Player> {
        return await (await axios.post(ActorPath.Player + name + '/weapons', weapon)).data;
    }

    static async createPlayerArmor(name: string, armor: ActorArmor): Promise<Player> {
        return await (await axios.post(ActorPath.Player + name + '/armor', armor)).data;
    }

    static async createNemesis(name: string): Promise<Nemesis> {
        return await (await axios.post( ActorPath.Nemesis + name)).data;
    }

    static async getNemesis(name: string): Promise<Nemesis> {
        return await (await axios.get(ActorPath.Nemesis + name)).data;
    }

    static async getNemeses(): Promise<Nemesis[]> {
        return await (await axios.get(ActorPath.Nemesis)).data;
    }

    static async updateNemesis(name: string, nemesis: Nemesis): Promise<Nemesis> {
        return await (await axios.put(ActorPath.Nemesis + name, nemesis)).data;
    }

    static async updateNemesisSkill(name: string, skill: ActorSkill): Promise<Nemesis> {
        return await (await axios.put(ActorPath.Nemesis + name + '/skills', skill)).data;
    }
    
    static async addNemesisTalent(name: string, talent: ActorTalent): Promise<Nemesis> {
        return await (await axios.put(ActorPath.Nemesis + name + '/talents', talent)).data;
    }

    static async createNemesisWeapon(name: string, weapon: ActorWeapon): Promise<Nemesis> {
        return await (await axios.post(ActorPath.Nemesis + name + '/weapons', weapon)).data;
    }

    static async createNemesisArmor(name: string, armor: ActorArmor): Promise<Nemesis> {
        return await (await axios.post(ActorPath.Nemesis + name + '/armor', armor)).data;
    }

    static async createNemesisAbility(name: string, ability: Ability): Promise<Nemesis> {
        return await (await axios.post(ActorPath.Nemesis + name + '/ability', ability)).data;
    }

    static async createRival(name: string): Promise<Rival> {
        return await (await axios.post( ActorPath.Rival + name)).data;
    }

    static async getRival(id: number): Promise<Rival> {
        return await (await axios.get(ActorPath.Rival + id)).data;
    }

    static async getRivals(): Promise<Rival[]> {
        return await (await axios.get(ActorPath.Rival)).data;
    }

    static async updateRival(id: number, rival: Rival): Promise<Rival> {
        return await (await axios.put(ActorPath.Rival + id, rival)).data;
    }

    static async updateRivalSkill(id: number, skill: ActorSkill): Promise<Rival> {
        return await (await axios.put(ActorPath.Rival + id + '/skills', skill)).data;
    }

    static async addRivalTalent(id: number, talent: ActorTalent): Promise<Rival> {
        return await (await axios.put(ActorPath.Rival + id + '/talents', talent)).data;
    }

    static async createRivalWeapon(id: number, weapon: ActorWeapon): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + id + '/weapons', weapon)).data;
    }

    static async createRivalArmor(id: number, armor: ActorArmor): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + id + '/armor', armor)).data;
    }

    static async createRivalAbility(id: number, ability: Ability): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + id + '/ability', ability)).data;
    }

    static async createMinion(name: string): Promise<Minion> {
        return await (await axios.post( ActorPath.Minion + name)).data;
    }

    static async getMinion(id: number): Promise<Minion> {
        return await (await axios.get(ActorPath.Minion + id)).data;
    }

    static async getMinions(): Promise<Minion[]> {
        return await (await axios.get(ActorPath.Minion)).data;
    }

    static async updateMinion(id: number, minion: Minion): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + id, minion)).data;
    }

    static async updateMinionSkill(name: number, skill: GroupSkill): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name + '/skills', skill)).data;
    }

    static async addMinionTalent(id: number, talent: Talent): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + id + '/talents', talent)).data;
    }

    static async createMinionWeapon(id: number, weapon: ActorWeapon): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + id + '/weapons', weapon)).data;
    }

    static async createMinionArmor(id: number, armor: ActorArmor): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + id + '/armors', armor)).data;
    }

    static async createMinionAbility(name: number, ability: Ability): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name + '/ability', ability)).data;
    }
}