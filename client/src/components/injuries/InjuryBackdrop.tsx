import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Card, CardContent, CardHeader, Divider} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";
import Injury from "../../models/Injury";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";
import GridContainer from "../common/grid/GridContainer";

interface Props {
    injury: Injury
    open: boolean
    onClose: () => void
}

export default function InjuryBackdrop(props: Props) {
    const {injury, open, onClose} = props;

    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={injury.name}/>
                <CardContent>
                    <GridContainer centered>
                        <GridContainer spacing={2}>
                            <ViewFieldCard name={'Description'} value={injury.description}/>
                        </GridContainer>
                        <Divider/>
                        <GridContainer spacing={2}>
                            <ViewFieldCard name={'Severity'} value={injury.severity}/>
                            <ViewFieldCard name={'Min'} value={String(injury.min)}/>
                            <ViewFieldCard name={'Max'} value={String(injury.max)}/>
                        </GridContainer>
                        <CriticalInjuryModifierCard crit={injury}/>
                    </GridContainer>
                </CardContent>
            </Card>
        </Backdrop>
    );
}
