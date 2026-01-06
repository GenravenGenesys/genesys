import { Dialog, DialogContentText, Divider, MenuItem, Select, TextField } from "@mui/material";
import {type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import MinionService from "../../../../services/actor/MinionService";
import { ActorPath } from "../../../../services/RootPath";
import { ActorType } from "../../../../models/actor/Actor";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import RivalService from "../../../../services/actor/RivalService";
import NemesisService from "../../../../services/actor/NemesisService";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";
import {getPlayerController} from "../../../../api/generated/player-controller/player-controller.ts";
import {useFetchCurrentCampaign} from "../../../../hooks/campaign/useFetchCurrentCampaign.ts";

interface Props {
    open: boolean;
    actorType: ActorType;
    onClose: () => void;
}

const CreateActorDialog = (props: Props) => {
    const { open, actorType, onClose } = props;
    const [name, setName] = useState('');
    const [type, setType] = useState<ActorType>(actorType);
    const navigate = useNavigate();
    const {campaign} = useFetchCurrentCampaign();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case ActorType.Minion:
                const minion = await MinionService.createMinion(campaign.id, name);
                navigate(ActorPath.Minion + minion.id + '/edit');
                break
            case ActorType.Rival:
                const rival = await RivalService.createRival(campaign.id, name);
                navigate(ActorPath.Rival + rival.id + '/edit');
                break
            case ActorType.Nemesis:
                const nemesis = await NemesisService.createNemesis(campaign.id, name);
                navigate(ActorPath.Nemesis + nemesis.id + '/edit');
                break
            case ActorType.Player:
                const player = await getPlayerController().createPlayer(name);
                navigate(ActorPath.Player + player.id + '/view');
                break
        }
        onClose();
    };

    const onTypeChange = (value: ActorType): void => {
        setType(value);
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setName(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Create ' + type} />
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required />
                <Divider />
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
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose} />
        </Dialog>
    );
};

export default CreateActorDialog;
