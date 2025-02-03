import {Dialog, DialogContent} from "@mui/material";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";
import EncounterTypeCard from "../../../common/card/select/EncounterTypeCard";
import Encounter, {Type} from "../../../../models/campaign/encounter/Encounter";
import React, {useEffect, useState} from "react";
import Party from "../../../../models/campaign/Party";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import Scene from "../../../../models/campaign/Scene";
import SceneService from "../../../../services/SceneService";

interface Props {
    open: boolean;
    onClose: () => void;
    createEncounter: (encounter: Encounter) => void;
    party: Party;
    scene: Scene;
}

const AddEncounterDialog: React.FC<Props> = ({open, onClose, createEncounter, party, scene}) => {
    const [encounter, setEncounter] = useState<Encounter>({
        minions: [],
        nemeses: [],
        party: party,
        rivals: [],
        slots: [],
        type: Type.Combat
    });

    useEffect(() => {
        (async () => {
            const minions = await SceneService.getEnemyMinionsForScene(scene.id);
            const rivals = await SceneService.getEnemyRivalsForScene(scene.id);
            const nemeses = await SceneService.getEnemyNemesesForScene(scene.id);
            setEncounter(prevEncounter => ({
                ...prevEncounter,
                minions: minions,
                rivals: rivals,
                nemeses: nemeses,
            }));
        })();
    }, [scene.id]);

    const updateEncounter = <T, >(field: string, value: T) => {
        setEncounter({...encounter, [field]: value as T});
    };

    const onCreate = () => {

        createEncounter(encounter);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Add Encounter'}/>
            <DialogContent>
                <EncounterTypeCard value={encounter.type} onChange={updateEncounter<Type>}/>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default AddEncounterDialog;
