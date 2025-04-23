import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Talent from "../../models/Talent";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";
import TalentModifierCard from "./modifier/TalentModifierCard";

interface Props {
    talent: Talent;
    open: boolean;
    onClose: () => void;
}

const TalentBackdrop: React.FC<Props> = ({talent, open, onClose}) => {
    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={talent.name}/>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Description'} value={talent.description}/>
                        </Grid>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Ranked'} value={talent.ranked ? 'Yes' : 'No'}/>
                            <ViewFieldCard name={'Activation'} value={talent.activation}/>
                            <ViewFieldCard name={'Tier'} value={talent.tier}/>
                        </Grid>
                    </Grid>
                    <TalentModifierCard tal={talent}/>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default TalentBackdrop;