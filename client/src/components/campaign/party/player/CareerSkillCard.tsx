import {useEffect, useState} from "react";
import {Autocomplete, Card, CardContent, Grid, IconButton, TextField,} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import CareerService from "../../../../services/CareerService";
import Career from "../../../../models/actor/player/Career";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";
import CareerBackdrop from "../../career/CareerBackdrop";
import EditIcon from "@mui/icons-material/Edit";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
import {useLocation} from "react-router-dom";
import ViewFieldCard from "../../../common/ViewFieldCard";

interface Props {
    player: Player;
    onCommit: (value: Career) => void;
    onSkillSelect: (skills: PlayerSkill[]) => void;
}

export default function CareerSelectCard(props: Props) {
    const {player, onCommit, onSkillSelect} = props;
    const [careers, setCareers] = useState<Career[]>([]);
    const [openCareerBackDrop, setOpenCareerBackDrop] = useState(false);
    const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            setCareers(await CareerService.getCareers());
        })()
    }, []);

    return useLocation().pathname.endsWith("/view") ?
        <ViewFieldCard name={"Career"} value={player.career.name}/> :
        <Grid xs>
            <Card>
                <CenteredCardHeader title={'Career'}/>
                <CardContent>
                    <Grid container>
                        <Grid sx={{"width": .8}}>
                            <Autocomplete
                                options={careers}
                                getOptionLabel={(option) => option.name}
                                value={player.career}
                                fullWidth
                                onChange={(e, newValue) => onCommit(newValue as Career)}
                                renderInput={(params) => <TextField {...params} label='Career'
                                                                    variant="outlined"/>}
                            />
                        </Grid>
                        <Grid sx={{"width": .1}}>
                            <IconButton onClick={(): void => setOpenCareerSkillDialog(true)}>
                                <EditIcon/>
                            </IconButton>
                            {openCareerSkillDialog &&
                                <CareerSkillSelectDialog open={openCareerSkillDialog}
                                                         onClose={(): void => setOpenCareerSkillDialog(false)}
                                                         player={player} onSelect={onSkillSelect}/>}
                        </Grid>
                        <Grid sx={{"width": .1}}>
                            <IconButton onClick={(): void => setOpenCareerBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openCareerBackDrop &&
                                <CareerBackdrop open={openCareerBackDrop}
                                                onClose={(): void => setOpenCareerBackDrop(false)}
                                                career={player.career}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
};