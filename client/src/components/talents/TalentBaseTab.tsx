import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard";
import ActivationCard from "../common/card/select/ActivationCard";
import TierCard from "../common/card/select/TierCard";
import * as React from "react";
import TextFieldCard from "../common/card/TextFieldCard";
import GridContainer from "../common/grid/GridContainer";
import {Activation, LimitType, type Talent, type Tier} from "../../api/model";

interface Props {
    talent: Talent;
    updateTalent: (talent: Talent) => void;
    disabled: boolean;
}

const TalentBaseTab: React.FC<Props> = ({talent, updateTalent, disabled})=> {

    const handleRankedChange = async (value: boolean) => {
        if (talent) {
            updateTalent({...talent, ranked: value});
        }
    };

    const handleActivationChange = async (value: Activation) => {
        if (talent) {
            updateTalent({...talent, activation: value});
        }
    };

    const handleTierChange = async (value: Tier) => {
        if (talent) {
            updateTalent({...talent, tier: value});
        }
    };

    const handleSummaryChange = async (value: string) => {
        if (talent) {
            updateTalent({...talent, summary: value});
        }
    };

    const handleDescriptionChange = async (value: string) => {
        if (talent) {
            const lowerDescription = value.toLowerCase();
            const updates: Partial<Talent> = {description: value};

            if (lowerDescription.includes('once per session')) {
                updates.limit = {...(talent.limit ?? {}), type: LimitType.Per_Session, limit: 1};
            } else if (lowerDescription.includes('once per encounter')) {
                updates.limit = {...(talent.limit ?? {}), type: LimitType.Per_Encounter, limit: 1};
            } else if (lowerDescription.includes('once per round')) {
                updates.limit = {...(talent.limit ?? {}), type: LimitType.Per_Round, limit: 1};
            }

            if (lowerDescription.includes('use this talent')) {
                updates.activation = Activation['Active_(Action)'];
            }

            updateTalent({...talent, ...updates});
        }
    };

    return (
        <GridContainer centered>
            <GridContainer spacing={2}>
                <BooleanTextFieldCard title={'Ranked Talent'} value={talent.ranked}
                                      onChange={handleRankedChange} disabled={disabled}/>
                <ActivationCard value={talent.activation} onChange={handleActivationChange}
                                disabled={disabled}/>
                <TierCard value={talent.tier} onChange={handleTierChange}
                          disabled={disabled}/>
            </GridContainer>
            <GridContainer spacing={2}>
                <TextFieldCard title={"Summary"} value={talent.summary}
                               disabled={disabled} onChange={handleSummaryChange}/>
            </GridContainer>
            <GridContainer spacing={2}>
                <TextFieldCard title={"Description"} value={talent.description}
                               disabled={disabled} onChange={handleDescriptionChange}/>
            </GridContainer>
        </GridContainer>
    );
};

export default TalentBaseTab;