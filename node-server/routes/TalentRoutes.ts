import Router from 'express-promise-router';
import {createTalent, getAllTalents, getTalent, updateTalent} from '../controller/TalentController.ts'
import {TALENT_PATH} from "../utils/Path.ts";

export const talentRouter = Router();

talentRouter.route(TALENT_PATH)
.get(getAllTalents)

talentRouter.route(`${TALENT_PATH}:name`)
.post(createTalent)

talentRouter.route(`${TALENT_PATH}:id`)
.put(updateTalent)
.get(getTalent)