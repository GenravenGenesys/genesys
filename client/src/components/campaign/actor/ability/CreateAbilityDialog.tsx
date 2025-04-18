import {Dialog, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Ability from "../../../../models/Ability";
import {Activation} from "../../../../models/Talent";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import {LimitType} from "../../../../models/common/Limit";
import {CostType} from "../../../../models/common/Cost";
import {useLocation} from "react-router-dom";
import ActivationCard from "../../../common/card/select/ActivationCard";
import TextFieldCard from "../../../common/card/TextFieldCard";

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

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAbility({...ability, description: event.target.value});
    }

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>Add Custom Ability</DialogTitle>
            <DialogContent>
                <Grid container>
                    <TextField
                        value={ability.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </Grid>
                <Grid container>
                    <TextFieldCard title={"Description"} value={ability.description}
                                   disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                </Grid>
                <Grid container>
                    <ActivationCard value={ability.activation} onChange={handleActivationChange} disabled={pathname.endsWith('/view')}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default CreateAbilityDialog;