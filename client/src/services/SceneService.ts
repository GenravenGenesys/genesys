import Scene from "../models/campaign/Scene";
import {RootPath, ScenePath} from "./RootPath";
import Rival from "../models/actor/npc/Rival";
import Nemesis from "../models/actor/npc/Nemesis";
import Minion, {MinionGroup} from "../models/actor/npc/Minion";
import Character from "../models/campaign/encounter/Character";


export default class SceneService {

    static async getScenes(): Promise<Scene[]> {
        return await fetch(RootPath.Scenes)
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

    static async getScene(id: string): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createScene(name: string): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateScene(scene: Scene): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${scene.id}`, {
            method: "PUT",
            body: JSON.stringify(scene),
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

    static async getEnemyMinionsForScene(id: string): Promise<MinionGroup[]> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Minion)
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

    static async addMinionToScene(id: string, minion: Minion): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Minion + '3', {
            method: "POST",
            body: JSON.stringify(minion),
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

    static async getEnemyRivalsForScene(id: string): Promise<Rival[]> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Rival)
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

    static async addRivalToScene(id: string, rival: Rival): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Rival, {
            method: "POST",
            body: JSON.stringify(rival),
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

    static async getEnemyNemesesForScene(id: string): Promise<Nemesis[]> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Nemesis)
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

    static async addNemesisToScene(id: string, nemesis: Nemesis): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Nemesis, {
            method: "POST",
            body: JSON.stringify(nemesis),
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

    static async getPlayerCharactersForScene(id: string): Promise<Character[]> {
        return await fetch(RootPath.Scenes + `${id}` + ScenePath.Nemesis)
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
}