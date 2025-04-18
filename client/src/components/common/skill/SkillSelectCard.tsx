import Skill from "../../../models/actor/Skill";
import {
    Card,
    CardContent,
    ClickAwayListener,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import EditField from "../EditField";
import CenteredCardHeader from "../card/header/CenteredCardHeader";

interface Props {
    defaultValue: Skill
    onCommit: (value: Skill) => void
    skills: Skill[]
    title: string
}

export default function SkillSelectCard(props: Props) {
    const {defaultValue, onCommit, skills, title} = props

    return (
        <Grid xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <SkillSelectField defaultValue={defaultValue} skills={skills} onCommit={onCommit}/>
                </CardContent>
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

function SkillSelectField(props: FieldProps) {
    const {defaultValue, skills, onCommit, onChange} = props
    const [skill, setSkill] = useState(defaultValue)
    const [edit, setEdit] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(skill)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {

        let selectedSkill = skills.find((sk) => sk.name === event.target.value) as Skill
        setSkill(selectedSkill)

        if (onChange) {
            onChange(selectedSkill)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={skill} helperText={'Required Skill'} onChange={inputOnChange} select fullWidth>
                {skills.map((skill: Skill) => (<MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>))}
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = skill && <Typography style={{wordWrap: 'break-word'}}>{skill.name}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setSkill(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={true} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}