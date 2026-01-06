import { Dialog, DialogContentText, Divider, MenuItem, Select, TextField } from "@mui/material";
import {type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { ActorPath } from "../../../../services/RootPath";
import GenesysDialogActions from "../../../common/dialog/GenesysDialogActions";
import CenteredDialogTitle from "../../../common/dialog/CenteredDialogTitle";
import {getPlayerController} from "../../../../api/generated/player-controller/player-controller.ts";
import {getNemesisController} from "../../../../api/generated/nemesis-controller/nemesis-controller.ts";
import {getRivalController} from "../../../../api/generated/rival-controller/rival-controller.ts";
import {getMinionController} from "../../../../api/generated/minion-controller/minion-controller.ts";
import {ActorType} from "../../../../api/model";

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

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case ActorType.Minion:
                const minion = await getMinionController().createMinion(name);
                navigate(ActorPath.Minion + minion.id + '/edit');
                break
            case ActorType.Rival:
                const rival = await getRivalController().createRival(name);
                navigate(ActorPath.Rival + rival.id + '/edit');
                break
            case ActorType.Nemesis:
                const nemesis = await getNemesisController().createNemesis(name);
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
