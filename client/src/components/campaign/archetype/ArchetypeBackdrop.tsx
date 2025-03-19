import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ViewFieldCard from "../../common/ViewFieldCard";
import Archetype from "../../../models/actor/player/Archetype";
import {CharacteristicType} from "../../../models/actor/Characteristic";
import {Card, CardContent, Grid} from "@mui/material";
import {StatsType} from "../../../models/actor/Stats";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";

interface Props {
    archetype: Archetype;
    open: boolean;
    onClose: () => void;
}

const ArchetypeBackdrop: React.FC<Props> = ({archetype, open, onClose})=> {
    return (
        <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={archetype.name}/>
                <CardContent>
                    <Grid container>
                        <ViewFieldCard name={CharacteristicType.Brawn} value={String(archetype.brawn)}/>
                        <ViewFieldCard name={CharacteristicType.Agility} value={String(archetype.agility)}/>
                        <ViewFieldCard name={CharacteristicType.Intellect} value={String(archetype.intellect)}/>
                        <ViewFieldCard name={CharacteristicType.Cunning} value={String(archetype.cunning)}/>
                        <ViewFieldCard name={CharacteristicType.Willpower} value={String(archetype.willpower)}/>
                        <ViewFieldCard name={CharacteristicType.Presence} value={String(archetype.presence)}/>
                    </Grid>
                    <Grid container>
                        <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(archetype.wounds)}/>
                        <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(archetype.strain)}/>
                        <ViewFieldCard name={'Base Experience'} value={String(archetype.experience)}/>
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default ArchetypeBackdrop;