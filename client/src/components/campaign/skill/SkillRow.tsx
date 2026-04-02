import type {Skill} from "../../../api/model";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import SkillBackdrop from "../../skills/SkillBackdrop.tsx";
import {useState} from "react";
import {
    getCampaignSkillController
} from "../../../api/generated/campaign-skill-controller/campaign-skill-controller.ts";

interface Props {
    skill: Skill
}

export default function SkillRow(props: Props) {
    const {skill} = props;
    const [openSkillBackDrop, setOpenSkillBackDrop] = useState(false);

    const addSkill = async (skill: Skill) => {
        await getCampaignSkillController().addSkillToCurrentCampaign(skill.id);
    };

    return (
        <TableRow key={skill.id}>
            <TableCell>
                <Button onClick={(): void => setOpenSkillBackDrop(true)}>{skill.name}</Button>
                {openSkillBackDrop &&
                    <SkillBackdrop open={openSkillBackDrop}
                                   onClose={(): void => setOpenSkillBackDrop(false)}
                                   skill={skill}/>}
            </TableCell>
            <TableCell>
                <Button onClick={() => addSkill(skill)}>Add</Button>
            </TableCell>
        </TableRow>
    );
}