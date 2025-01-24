import { Dialog, DialogContent } from "@mui/material";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";
import EncounterTypeCard from "../../../common/card/select/EncounterTypeCard";
import Encounter, { Type } from "../../../../models/campaign/encounter/Encounter";
import React, { useState } from "react";
import Party from "../../../../models/campaign/Party";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean;
    onClose: () => void;
    createEncounter: (encounter: Encounter) => void;
    party: Party;
}

const AddEncounterDialog: React.FC<Props> = ({ open, onClose, createEncounter, party }) => {
    const [encounter, setEncounter] = useState<Encounter>({
        minions: [],
        nemeses: [],
        party: party,
        rivals: [],
        slots: [],
        type: Type.Combat
    });

    const updateEncounter = <T,>(field: string, value: T) => {
        setEncounter({ ...encounter, [field]: value as T });
    };

    const onCreate = () => {
        createEncounter(encounter);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Encounter'} />
            <DialogContent>
                <EncounterTypeCard value={encounter.type} onChange={updateEncounter<Type>} disabled={false} />
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose} />
        </Dialog>
    );
};

export default AddEncounterDialog;
