import { Card, CardContent } from "@mui/material";
import { ActorSkill } from "../../../../models/actor/Actor";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";

interface Props {
    name: string;
    actor: SingleNonPlayerCharacter;
    onChange: (skill: ActorSkill) => void;
}

const ActorInitiativeCard: React.FC<Props> = ({ name, actor, onChange }) => {
    return (
        <Card>
            <CenteredCardHeader title={name} />
            <CardContent>
                {/* <SkillSelect actor={actor} onChange={onChange} /> */}
            </CardContent>
        </Card>
    );
};

export default ActorInitiativeCard;
