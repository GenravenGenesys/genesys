import {renderSkillName} from "../skill/SkillRenders";
import Skill from "../../../models/actor/Skill";
import {Autocomplete, TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";

interface Props {
    skill: Skill
    skills: Skill[]
    onChange: (index: number, value: Skill) => void
    index: number
    disabled: boolean
}

export default function SkillAutocompleteTableCell(props: Props) {
    const {skill, skills, onChange, index, disabled} = props;

    return (
        <TableCell sx={{"width": .5}}>
            <Autocomplete
                options={skills}
                getOptionLabel={(option) => renderSkillName(option)}
                value={skill}
                onChange={(e, newValue) => onChange(index, newValue as Skill)}
                renderInput={(params) => <TextField {...params} label="Skill"
                                                    variant="outlined"/>}
                disabled={disabled}
            />
        </TableCell>
    )
}