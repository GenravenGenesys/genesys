import { Session } from "react-router";
import { CampaignPath, RootPath } from "./RootPath";
import { apiRequest, apiRequestList } from "./ApiRequest";
import Scene from "../models/campaign/Scene";

export default class SceneService {

    static async addSceneToSession(sceneName: string, sceneId: string): Promise<Session> {
        return apiRequest(CampaignPath.Session + `${sceneName}` + RootPath.Scenes + `${sceneId}`, "POST");
    }

    static async getScenesForSession(sceneName: string): Promise<Scene[]> {
        return apiRequestList(CampaignPath.Session + `${sceneName}` + RootPath.Scenes);
    }
}