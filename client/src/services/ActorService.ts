import axios from "axios";
import Player from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {ActorPath} from "./Path";
import Rival from "../models/actor/npc/Rival";
import Actor from "../models/actor/Actor";
import Minion from "../models/actor/npc/Minion";
import {ActorWeapon} from "../models/equipment/Weapon";
import {ActorArmor} from "../models/equipment/Armor";
import Ability from "../models/Ability";
import NonPlayerActor from "../models/actor/npc/NonPlayerActor";

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

    static async getRival(name: string): Promise<Rival> {
        return await (await axios.get(ActorPath.Rival + name)).data;
    }

    static async getRivals(): Promise<Rival[]> {
        return await (await axios.get(ActorPath.Rival)).data;
    }

    static async updateRival(name: string, rival: Rival): Promise<Rival> {
        return await (await axios.put(ActorPath.Rival + name, rival)).data;
    }

    static async createRivalWeapon(name: string, weapon: ActorWeapon): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + name + '/weapons', weapon)).data;
    }

    static async createRivalArmor(name: string, armor: ActorArmor): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + name + '/armor', armor)).data;
    }

    static async createRivalAbility(name: string, ability: Ability): Promise<Rival> {
        return await (await axios.post(ActorPath.Rival + name + '/ability', ability)).data;
    }

    static async createMinion(name: string): Promise<Minion> {
        return await (await axios.post( ActorPath.Minion + name)).data;
    }

    static async getMinion(name: string): Promise<Minion> {
        return await (await axios.get(ActorPath.Minion + name)).data;
    }

    static async getMinions(): Promise<Minion[]> {
        return await (await axios.get(ActorPath.Minion)).data;
    }

    static async updateMinion(name: string, minion: Minion): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name, minion)).data;
    }

    static async createMinionWeapon(name: string, weapon: ActorWeapon): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name + '/weapons', weapon)).data;
    }

    static async createMinionArmor(name: string, armor: ActorArmor): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name + '/armors', armor)).data;
    }

    static async createMinionAbility(name: string, ability: Ability): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name + '/ability', ability)).data;
    }
}