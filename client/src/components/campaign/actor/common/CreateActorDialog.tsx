import {Dialog, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import MinionService from "../../../../services/actor/MinionService";
import {ActorPath} from "../../../../services/RootPath";
import {ActorType} from "../../../../models/actor/Actor";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import {useFetchCurrentCampaign} from "../../CampaignWorkflow";
import RivalService from "../../../../services/actor/RivalService";
import NemesisService from "../../../../services/actor/NemesisService";
import PlayerService from "../../../../services/actor/PlayerService";
import * as React from "react";

interface Props {
    open: boolean
    actorType: ActorType
    onClose: () => void
}

export default function CreateActorDialog(props: Props) {
    const {open, actorType, onClose} = props;
    const [name, setName] = useState('');
    const [type, setType] = useState<ActorType>(actorType);
    let navigate = useNavigate();
    let campaign = useFetchCurrentCampaign();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case ActorType.Minion:
                let minion = await MinionService.createMinion(campaign.id, name);
                navigate(ActorPath.Minion + minion.id + '/edit');
                break
            case ActorType.Rival:
                let rival = await RivalService.createRival(campaign.id, name);
                navigate(ActorPath.Rival + rival.id + '/edit');
                break
            case ActorType.Nemesis:
                let nemesis = await NemesisService.createNemesis(campaign.id, name);
                navigate(ActorPath.Nemesis + nemesis.id + '/edit');
                break
            case ActorType.Player:
                let player = await PlayerService.createPlayer(campaign.id, name);
                navigate(ActorPath.Player + player.id + '/edit');
                break
        }
        onClose();
    }

    const onTypeChange = (value: ActorType): void => {
        setType(value);
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    }

    const getTitle = (): string => {
        return 'Create ' + type;
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider/>
                <Select
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value as ActorType)}
                    fullWidth
                    label={'Type'}
                >
                    {Object.values(ActorType).map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    );
}
