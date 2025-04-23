import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";
import Injury from "../../models/Injury";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";

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
                    <Grid container sx={{
                        justifyContent: 'center'
                    }}>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Description'} value={injury.description}/>
                        </Grid>
                        <Divider/>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Severity'} value={injury.severity}/>
                            <ViewFieldCard name={'Min'} value={String(injury.min)}/>
                            <ViewFieldCard name={'Max'} value={String(injury.max)}/>
                        </Grid>
                        <CriticalInjuryModifierCard crit={injury}/>
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    );
}
