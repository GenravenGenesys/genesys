import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Talent from "../../models/Talent";
import {Card, CardContent, CardHeader} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";
import TalentModifierCard from "./modifier/TalentModifierCard";
import GridContainer from "../common/grid/GridContainer";

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
                    <GridContainer centered>
                        <GridContainer spacing={2}>
                            <ViewFieldCard name={'Description'} value={talent.description}/>
                        </GridContainer>
                        <GridContainer spacing={2}>
                            <ViewFieldCard name={'Ranked'} value={talent.ranked ? 'Yes' : 'No'}/>
                            <ViewFieldCard name={'Activation'} value={talent.activation}/>
                            <ViewFieldCard name={'Tier'} value={talent.tier}/>
                        </GridContainer>
                    </GridContainer>
                    <TalentModifierCard tal={talent}/>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default TalentBackdrop;
