import {Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Ability from "../../../../models/Ability";
import {Activation} from "../../../../models/Talent";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import {LimitType} from "../../../../models/common/Limit";
import {CostType} from "../../../../models/common/Cost";
import {useLocation} from "react-router";
import ActivationCard from "../../../common/card/select/ActivationCard";
import TextFieldCard from "../../../common/card/TextFieldCard";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    open: boolean;
    onCreateAbility: (ability: Ability) => void;
    onClose: () => void;
}

const CreateAbilityDialog: React.FC<Props> = ({open, onCreateAbility, onClose})=> {
    const [ability, setAbility] = useState<Ability>({
        name: '',
        activation: Activation.Passive,
        description: '',
        limiter: {type: LimitType.None, limit: 0},
        cost: {type: CostType.None, amount: 0},
        modifiers: []
    });
    let pathname = useLocation().pathname;

    const onCreate = () => {
        onCreateAbility(ability);
        onClose();
    };

    const handleNameChange = (value: string) => {
        setAbility({...ability, name: value});
    };

    const handleActivationChange = (value: Activation) => {
        setAbility({...ability, activation: value});
    };

    const handleDescriptionChange = (value: string) => {
        setAbility({...ability, description: value});
    }

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>Add Custom Ability</DialogTitle>
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
                                   disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                </GridContainer>
                <GridContainer>
                    <ActivationCard value={ability.activation} onChange={handleActivationChange} disabled={pathname.endsWith('/view')}/>
                </GridContainer>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default CreateAbilityDialog;