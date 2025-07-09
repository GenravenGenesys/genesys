import { Card, CardContent } from "@mui/material";
import { ActorSkill } from "../../../../models/actor/Actor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import Character from "../../../../models/campaign/encounter/Character";

interface Props {
    name: string;
    character: Character;
    onChange: (skill: ActorSkill) => void;
}

const ActorInitiativeCard: React.FC<Props> = ({ name, character, onChange }) => {
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
