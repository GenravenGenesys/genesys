import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import {Fragment} from "react";
import {GenesysDicePoolCenterTableCellButton} from "./TypographyTableCell";
import Actor from "../../../models/actor/Actor";
import {Activation, type ActorTalent} from "../../../api/model";

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
            case Activation["Active_(Action)"]:
                return renderActivation();
            case Activation["Active_(Maneuver)"]:
                break;
            case Activation["Active_(Incidental)"]:
                return (
                    // <Button onClick={}>
                    //
                    // </Button>
                    <Fragment/>
                );
            case Activation["Active_(Incidental,_Out_of_Turn)"]:
                break;
        }
    };

    return (
        <TableCell align='center'>
            {renderTableCell()}
        </TableCell>
    );
}