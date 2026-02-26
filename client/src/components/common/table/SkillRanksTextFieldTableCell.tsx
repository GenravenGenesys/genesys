import {TextField} from "@mui/material";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../models/actor/Actor";

interface Props {
    skill: ActorSkill
    onChange: (skill: ActorSkill) => void
    disabled: boolean
}

export default function SkillRanksTextFieldTableCell(props: Props) {
    const {skill, onChange, disabled} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <TextField
                type="number"
                value={skill.ranks}
                label={'Ranks'}
                fullWidth
                onChange={(e) => onChange({...skill, ranks: Number(e.target.value)})}
                slotProps={{
                    htmlInput: {
                        min: 1,
                        max: 5,
                        step: 1,
                        autoFocus: true
                    }
                }}
                disabled={disabled}
            />
        </TableCell>
    )
}