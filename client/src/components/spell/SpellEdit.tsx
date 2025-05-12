import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Difficulty, getDifficultyOptions} from "../../models/common/Difficulty";
import {Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InputTextFieldCard from "../common/InputTextFieldCard";
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import * as React from "react";
import Spell from "../../models/spell/Spell";
import SpellService from "../../services/SpellService";
import CheckButtonCard from "../common/CheckButtonCard";
import SkillService from "../../services/SkillService";
import SpellEffectCard from "./effect/SpellEffectCard";
import SpellSkillCard from "./SpellSkillCard";
import {RootPath} from "../../services/RootPath";
import GridContainer from "../common/grid/GridContainer";

interface Props {
    sp: Spell
}

export default function SpellEdit(props: Props): JSX.Element {
    const {sp} = props
    const [spell, setSpell] = useState<Spell>(sp)
    let navigate = useNavigate()

    useEffect(() => {
        setSpell(sp)
    }, [sp])

    const onSkillAddition = async (name: string) => {
        const copySpell = {...spell} as Spell
        let skill = await SkillService.getSkill(name)
        copySpell.skills = copySpell.skills.concat(skill)
        await updateSpell(copySpell)
    }

    const onSkillRemoval = async (name: string) => {
        const copySpell = {...spell} as Spell
        copySpell.skills.forEach((skill, index) => {
            if (skill.name === name) {
                copySpell.skills.splice(index, 1)
            }
        })
        await updateSpell(copySpell)
    }

    const onChange = async (key: keyof Spell, value: string) => {
        if (value.trim().length === 0 || (spell !== null && spell!![key] === value)) {
            return
        }
        const copySpell = {...spell} as Spell;
        switch (key) {
            case "concentration":
                copySpell.concentration = !Boolean(copySpell.concentration)
                break;
            case "difficulty":
                copySpell.difficulty = value as Difficulty
                break;
            case 'description':
                copySpell.description = value
                break
            case "skills":
                break;
            case "effects":
                break;
        }
        await updateSpell(copySpell)
    }

    const updateSpell = async (copySpell: Spell) => {
        setSpell(await SpellService.updateSpell(copySpell))
    }

    const onView = () => {
        navigate(RootPath.Spell + spell.name + '/view');
    }

    return (
        <Card>
            <CardHeader title={spell.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={2}>
                        <InputTextFieldCard defaultValue={spell?.description!!} onCommit={(value: string): void => {
                            onChange('description', value)
                        }} title={'Description'} helperText={'Description'} placeholder={'Description'}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={2}>
                        <InputSelectFieldCard defaultValue={spell.difficulty} onCommit={(value: string): void => {
                            onChange('difficulty', value)
                        }} title={'Base Difficulty'} options={getDifficultyOptions()}/>
                        <CheckButtonCard title={'Concentration'} value={spell.concentration}
                                         onChange={(value: boolean): void => {
                                             onChange('concentration', String(value))
                                         }}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <SpellSkillCard spell={spell} onSkillAddition={onSkillAddition}
                                        onSkillRemoval={onSkillRemoval}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <SpellEffectCard spell={spell}/>
                    </GridContainer>
                </GridContainer>
            </CardContent>
        </Card>
    );
}