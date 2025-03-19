import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Skill from "../../models/actor/Skill";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import ViewFieldCard from "../common/ViewFieldCard";

interface Props {
    skill: Skill;
    open: boolean;
    onClose: () => void;
}

const SkillBackdrop: React.FC<Props> = ({skill, open, onClose})=> {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={skill.name}/>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <ViewFieldCard name={'Skill Type'} value={skill.type} />
                        <ViewFieldCard name={'Characteristic'} value={skill.characteristic} />
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    );
};

export default SkillBackdrop;
