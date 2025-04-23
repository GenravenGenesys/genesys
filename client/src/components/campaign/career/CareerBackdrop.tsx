import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Card, CardContent, Typography} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import Career from "../../../models/actor/player/Career";
import {renderSkillNames} from "../../common/skill/SkillRenders";

interface Props {
    career: Career
    open: boolean
    onClose: () => void
}

export default function CareerBackdrop(props: Props) {
    const {career, open, onClose} = props

    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CenteredCardHeader title={career.name}/>
                <CardContent>
                    <Typography>{renderSkillNames(career.skills)}</Typography>
                </CardContent>
            </Card>
        </Backdrop>
    );
}