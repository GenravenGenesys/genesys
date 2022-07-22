import axios from "axios";
import Talent, {DefaultTalent} from "../models/Talent";
import {Path} from "./Path";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get(Path.Talent)).data;
    }

    static async getTalentNames(): Promise<string[]> {
        return await (await axios.get(Path.Talent + '/names')).data;
    }

    static async getTalent(name: string): Promise<Talent> {
        return await (await axios.get(Path.Talent + '/' + name)).data;
    }

    static async createTalent(name: string): Promise<Talent> {
        return await axios.post(Path.Talent, DefaultTalent.create(name));
    }

    static async updateTalent(name: string, talent: Talent): Promise<Talent> {
        return await axios.put(Path.Talent + '/' + name, talent);
    }
}