import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SkillService from '../../services/SkillService';
import Skill, {SkillType} from '../../models/actor/Skill';
import {Option} from '../common/InputSelectField';
import {CharacteristicType} from '../../models/character/Characteristic';
import InputSelectFieldCard from "../common/InlineSelectFieldCard";
import {RootPath} from "../../services/RootPath";
import CheckIcon from "@mui/icons-material/Check";

const getSkillTypes = (): Option[] => {
    return Object.values(SkillType).map((value) => ({value}))
}

const getCharacteristicTypes = (): Option[] => {
    return Object.values(CharacteristicType).map((value) => ({value}))
}

interface Props {
    sk: Skill
}

export default function SkillEdit(props: Props) {
    const {sk} = props
    const [skill, setSkill] = useState<Skill>(sk)

    let navigate = useNavigate()

    useEffect(() => {
        setSkill(sk)
    }, [sk])

    const onChange = async (key: keyof Skill, value: any) => {
        if (value === null || (skill !== null && skill[key] === value)) {
            return;
        }
        const copySkill = {...skill} as Skill
        switch (key) {
            case 'characteristic':
                copySkill.characteristic = value
                break
            case 'type':
                copySkill.type = value
                break
        }

        await updateSkill(copySkill)
    }

    const updateSkill = async (copySkill: Skill) => {
        setSkill(await SkillService.updateSkill(copySkill))
    }

    const onView = () => {
        navigate(RootPath.Skills + skill.skill_id + '/view');
    }

    return (
        <Card>
            <CardHeader title={skill.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <InputSelectFieldCard defaultValue={skill.type} onCommit={(value: string): void => {
                        onChange('type', value)
                    }} title={'Skill Type'} options={getSkillTypes()}/>
                    <InputSelectFieldCard defaultValue={skill.characteristic} onCommit={(value: string): void => {
                        onChange('characteristic', value)
                    }} title={'Linked Characteristic'} options={getCharacteristicTypes()}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
