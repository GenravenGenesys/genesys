import Scene from "../models/campaign/Scene";
import {RootPath, ScenePath} from "./RootPath";
import Rival from "../models/actor/npc/Rival";
import Nemesis from "../models/actor/npc/Nemesis";
import Minion, {MinionGroup} from "../models/actor/npc/Minion";
import Character from "../models/campaign/encounter/Character";
import {apiRequest, apiRequestList} from "./ApiRequest";


export default class SceneService {

    static async getScenes(): Promise<Scene[]> {
        return apiRequestList(RootPath.Scenes);
    }

    static async getScene(id: string): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${id}`);
    }

    static async createScene(name: string): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${name}`, "POST");
    }

    static async updateScene(scene: Scene): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${scene.id}`, "PUT", scene);
    }

    static async getEnemyMinionsForScene(id: string): Promise<MinionGroup[]> {
        return apiRequestList(RootPath.Scenes + `${id}` + ScenePath.Minion);
    }

    static async addMinionToScene(id: string, minion: Minion): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${id}` + ScenePath.Minion + '3', "POST", minion);
    }

    static async getEnemyRivalsForScene(id: string): Promise<Rival[]> {
        return apiRequestList(RootPath.Scenes + `${id}` + ScenePath.Rival);
    }

    static async addRivalToScene(id: string, rival: Rival): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${id}` + ScenePath.Rival, "POST", rival);
    }

    static async getEnemyNemesesForScene(id: string): Promise<Nemesis[]> {
        return apiRequestList(RootPath.Scenes + `${id}` + ScenePath.Nemesis);
    }

    static async addNemesisToScene(id: string, nemesis: Nemesis): Promise<Scene> {
        return apiRequest(RootPath.Scenes + `${id}` + ScenePath.Nemesis, "POST", nemesis);
    }

    static async getPlayerCharactersForScene(id: string): Promise<Character[]> {
        return apiRequestList(RootPath.Scenes + `${id}` + ScenePath.Players);
    }
}