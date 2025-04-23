import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";
import GridContainer from "../common/grid/GridContainer";

interface Props {
    skill: Skill;
    open: boolean;
    onClose: () => void;
}

const SkillBackdrop: React.FC<Props> = ({skill, open, onClose})=> {
    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={skill.name}/>
                <CardContent>
                    <GridContainer centered>
                        <ViewFieldCard name={'Skill Type'} value={skill.type} />
                        <ViewFieldCard name={'Characteristic'} value={skill.characteristic} />
                    </GridContainer>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default SkillBackdrop;
