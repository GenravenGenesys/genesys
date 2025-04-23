import TableCell from "@mui/material/TableCell";
import {Activation, ActorTalent} from "../../../models/Talent";
import Typography from "@mui/material/Typography";
import React, {Fragment} from "react";
import {GenesysDicePoolCenterTableCellButton} from "./TypographyTableCell";
import Actor from "../../../models/actor/Actor";

interface Props {
    actor: Actor
    talent: ActorTalent
    target?: Actor
}

export default function TalentActivationTableCell(props: Props) {
    const {actor, talent, target} = props;

    const renderActivation = () => {
        if (talent.talentSkillCheck.difficulty) {
            return <GenesysDicePoolCenterTableCellButton actor={actor} skill={talent.talentSkillCheck.skill}
                                                         difficulty={talent.talentSkillCheck.difficulty}/>;
        } else if (target) {
            return <GenesysDicePoolCenterTableCellButton actor={actor} skill={talent.talentSkillCheck.skill}
                                                         target={{
                                                             actor: target,
                                                             skill: talent.talentSkillCheck.opposedSkill
                                                         }}/>;
        } else {
            return <GenesysDicePoolCenterTableCellButton actor={actor} skill={talent.talentSkillCheck.skill}/>;
        }
    }

    const renderTableCell = () => {
        switch (talent.activation) {
            case Activation.Passive:
                return <Typography>{talent.activation}</Typography>;
            case Activation.ActiveAction:
                return renderActivation();
            case Activation.ActiveManeuver:
                break;
            case Activation.ActiveIncidental:
                return (
                    // <Button onClick={}>
                    //
                    // </Button>
                    <Fragment/>
                );
            case Activation.ActiveIncidentalOutOfTurn:
                break;
        }
    };

    return (
        <TableCell align='center'>
            {renderTableCell()}
        </TableCell>
    );
}