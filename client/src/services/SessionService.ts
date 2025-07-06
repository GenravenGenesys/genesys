import { Session } from "react-router";
import { CampaignPath, RootPath } from "./RootPath";
import { apiRequest } from "./ApiRequest";

export default class SceneService {

    static async addSceneToSession(sceneName: string, sceneId: string): Promise<Session> {
        return apiRequest(CampaignPath.Session + `${sceneName}` + RootPath.Scenes + + `${sceneId}`, "POST");
    }
}