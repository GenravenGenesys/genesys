import { Dialog, DialogContent, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Minion from "../../../../../models/actor/npc/Minion";
import { useLocation } from "react-router";
import ActivationCard from "../../../../common/card/select/ActivationCard";
import TextFieldCard from "../../../../common/card/TextFieldCard";
import CenteredDialogTitle from "../../../../common/dialog/CenteredDialogTitle";
import GenesysDialogActions from "../../../../common/dialog/GenesysDialogActions";
import GridContainer from "../../../../common/grid/GridContainer";
import MinionAbilityActionCard from "./MinionAbilityActionCard";
import {
    type Ability, type Action,
    Activation,
    type ActorSkill,
    CostType,
    Difficulty,
    LimitType,
    RangeBand
} from "../../../../../api/model";

interface Props {
    open: boolean;
    minion: Minion;
    onCreateAbility: (ability: Ability) => void;
    onClose: () => void;
}

const CreateMinionAbilityDialog: React.FC<Props> = ({ open, minion, onCreateAbility, onClose }) => {
    const [ability, setAbility] = useState<Ability>({
        name: '',
        activation: Activation.Passive,
        description: '',
        limit: { type: LimitType.None, limit: 0 },
        cost: { type: CostType.None, amount: 0 },
        action: {
            skill: {} as ActorSkill,
            difficulty: Difficulty.Easy,
            opposedSkill: {} as ActorSkill,
            rangeBand: RangeBand.Engaged
        },
        modifiers: []
    });
    const pathname = useLocation().pathname;

    const onCreate = () => {
        onCreateAbility(ability);
        onClose();
    };

    const handleNameChange = (value: string) => {
        setAbility({ ...ability, name: value });
    };

    const handleActivationChange = (value: Activation) => {
        setAbility({ ...ability, activation: value });
    };

    const handleDescriptionChange = (value: string) => {
        setAbility({ ...ability, description: value });
    };

    const handleActionChange = (value: Action) => {
        setAbility({ ...ability, action: value });
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={"Add Custom Ability"} />
            <DialogContent>
                <GridContainer>
                    <TextField
                        value={ability.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </GridContainer>
                <GridContainer>
                    <TextFieldCard title={"Description"} value={ability.description}
                        disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange} />
                </GridContainer>
                <GridContainer>
                    <ActivationCard value={ability.activation} onChange={handleActivationChange} disabled={pathname.endsWith('/view')} />
                </GridContainer>
                <GridContainer>
                    <MinionAbilityActionCard action={ability.action} onChange={handleActionChange} disabled={pathname.endsWith('/view')} minion={minion} />
                </GridContainer>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose} />
        </Dialog>
    );
};

export default CreateMinionAbilityDialog;
