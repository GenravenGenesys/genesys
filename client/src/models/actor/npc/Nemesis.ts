import {SingleNonPlayerCharacter} from "./NonPlayerActor";
import type {Stats} from "../../../api/model";

export default interface Nemesis extends SingleNonPlayerCharacter {
    strain: Stats
}