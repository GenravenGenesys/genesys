import { Session } from "react-router";
import { CampaignPath, RootPath } from "./RootPath";
import { apiRequest, apiRequestList } from "./ApiRequest";
import Scene from "../models/campaign/Scene";

export default class SceneService {

    static async addSceneToSession(sessionName: string, sceneId: string): Promise<Session> {
        return apiRequest(CampaignPath.Session + `${sessionName}` + RootPath.Scenes + `${sceneId}`, "POST");
    }

    static async getScenesForSession(sessionName: string): Promise<Scene[]> {
        return apiRequestList(CampaignPath.Session + `${sessionName}` + RootPath.Scenes);
    }
}