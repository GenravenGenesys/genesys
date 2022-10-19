import Skill, {SkillType} from "../../models/actor/Skill";
import {Card, CardHeader, ClickAwayListener, Divider, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import EditField from "./EditField";
import SkillService from "../../services/SkillService";

interface Props {
    defaultValue: Skill
    onCommit: (value: Skill) => void
    type: SkillType
}

export default function SkillSelectCard(props: Props): JSX.Element {
    const { defaultValue, onCommit, type } = props
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const skillList = await SkillService.getSkills()
            if (!skillList) { return }
            setSkills(skillList.filter((skill) => skill.type === type))
        })()
    }, [type])

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Required Skill'} style={{ textAlign: 'center' }} />
                <Divider />
                <SkillSelectField defaultValue={defaultValue} skills={skills} onCommit={onCommit} />
            </Card>
        </Grid>
    )
}

interface FieldProps {
    defaultValue: Skill
    skills: Skill[]
    onCommit: (value: Skill) => void
    onChange?: (value: Skill) => void
}

function SkillSelectField(props: FieldProps): JSX.Element {
    const {defaultValue,skills,onCommit,onChange} = props
    const [skill, setSkill] = useState(defaultValue)
    const [edit, setEdit] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(skill)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {

        let selectedSkill = skills.find((sk)=> sk.name === event.target.value)!!
        setSkill(selectedSkill)

        if (onChange) {
            onChange(selectedSkill)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={skill} helperText={'Required Skill'} onChange={inputOnChange} select>
                {skills.map((skill: Skill) => (<MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>))}
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = <Typography style={{ wordWrap: 'break-word' }}>{skill?.name!!}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setSkill(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={true} editElement={editElement} onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}