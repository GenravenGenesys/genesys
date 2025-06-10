import { Card, CardContent } from "@mui/material";
import Talent from "../../../models/Talent";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import GridContainer from "../../common/grid/GridContainer";
import TalentSkillCheckCard from "../skill/TalentSkillCheckCard";

type Props = {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
};

const TalentActionTab: React.FC<Props> = ({ talent, updateTalent, disabled }) => {
    return (
        <Card>
            <CenteredCardHeader title={'Skill Check'} />
            <CardContent>
                <GridContainer spacing={2}>
                    <TalentSkillCheckCard talent={talent} updateTalent={updateTalent}
                        disabled={disabled} />
                </GridContainer>
            </CardContent>
        </Card>
    )

};

export default TalentActionTab;