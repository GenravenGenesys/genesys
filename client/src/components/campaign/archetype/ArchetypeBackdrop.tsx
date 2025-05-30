import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ViewFieldCard from "../../common/ViewFieldCard";
import Archetype from "../../../models/actor/player/Archetype";
import {CharacteristicType} from "../../../models/actor/Characteristic";
import {Card, CardContent} from "@mui/material";
import {StatsType} from "../../../models/actor/Stats";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import GridContainer from "../../common/grid/GridContainer";

interface Props {
    archetype: Archetype;
    open: boolean;
    onClose: () => void;
}

const ArchetypeBackdrop: React.FC<Props> = ({archetype, open, onClose})=> {
    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={archetype.name}/>
                <CardContent>
                    <GridContainer>
                        <ViewFieldCard name={CharacteristicType.Brawn} value={String(archetype.brawn)}/>
                        <ViewFieldCard name={CharacteristicType.Agility} value={String(archetype.agility)}/>
                        <ViewFieldCard name={CharacteristicType.Intellect} value={String(archetype.intellect)}/>
                        <ViewFieldCard name={CharacteristicType.Cunning} value={String(archetype.cunning)}/>
                        <ViewFieldCard name={CharacteristicType.Willpower} value={String(archetype.willpower)}/>
                        <ViewFieldCard name={CharacteristicType.Presence} value={String(archetype.presence)}/>
                    </GridContainer>
                    <GridContainer>
                        <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(archetype.wounds)}/>
                        <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(archetype.strain)}/>
                        <ViewFieldCard name={'Base Experience'} value={String(archetype.experience)}/>
                    </GridContainer>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default ArchetypeBackdrop;