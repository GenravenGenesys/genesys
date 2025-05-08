import {RootPath} from './RootPath';
import Skill from '../models/actor/Skill';
import {apiRequest, apiRequestList} from "./ApiRequest";

export default class SkillService {

    static async createSkill(name: string): Promise<Skill> {
        return apiRequest(RootPath.Skills + `${name}`, "POST");
    }

    static async getSkill(id: string): Promise<Skill> {
        return apiRequest(RootPath.Skills + `${id}`);
    }

    static async getSkills(): Promise<Skill[]> {
        return apiRequestList(RootPath.Skills);
    }

    static async updateSkill(skill: Skill): Promise<Skill> {
        return apiRequest(RootPath.Skills + `${skill.id}`, "PUT", skill);
    }
}