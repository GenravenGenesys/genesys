import { Card, CardContent } from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import GridContainer from "../../common/grid/GridContainer";
import TalentSkillCheckCard from "../skill/TalentSkillCheckCard";
import RangeBandCard from "../../common/card/select/RangeBandCard";
import type {RangeBand, Talent} from "../../../api/model";
import type {FC} from "react";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
}

const TalentActionTab: FC<Props> = ({ talent, updateTalent, disabled }) => {

    const handleRangeBandUpdate = (value: RangeBand) => {
        if (talent) {
            updateTalent({ ...talent, action: { ...talent.action, rangeBand: value } });
        }
    };

    return (
        <Card>
            <CenteredCardHeader title={'Action Information'} />
            <CardContent>
                <GridContainer spacing={2}>
                    <TalentSkillCheckCard talent={talent} updateTalent={updateTalent}
                        disabled={disabled} />
                </GridContainer>
                <GridContainer spacing={2}>
                    <RangeBandCard value={talent.action.rangeBand} onChange={handleRangeBandUpdate} disabled={disabled} />
                </GridContainer>
            </CardContent>
        </Card>
    )
};

export default TalentActionTab;