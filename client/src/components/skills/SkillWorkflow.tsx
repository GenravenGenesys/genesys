import {Fragment, useEffect, useState} from "react";
import Skill, {SkillType} from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation} from "react-router";
import ViewAllSkills from "./ViewAllSkills";
import {RootPath} from "../../services/RootPath";
import SkillPage from "./SkillPage";

export function useFetchAllSkills(): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [setSkills])
    return skills;
}

export function useFetchSkillsByType(type: SkillType): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    useEffect(() => {
        (async (): Promise<void> => {
            let skillList = await SkillService.getSkills()
            skillList = skillList.filter((skill) => skill.type === type)
            setSkills(skillList.sort((a, b) => a.name.localeCompare(b.name)))
        })()
    }, [setSkills, type])
    return skills;
}

export function useFetchSkill(id: string): Skill {
    const [skill, setSkill] = useState<Skill>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setSkill(await SkillService.getSkill(id))
        })()
    }, [id, setSkill])
    return skill as Skill
}

export default function SkillWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Skills) ? <ViewAllSkills/> : <SkillPage/>}
        </Fragment>
    )
}