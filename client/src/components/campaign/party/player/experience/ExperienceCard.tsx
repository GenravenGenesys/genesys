import Player from "../../../../../models/actor/player/Player";
import {Card, CardContent, Grid} from "@mui/material";
import ViewFieldCard from "../../../../common/ViewFieldCard";
import * as React from "react";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import SpendExperienceMenuButton from "./SpendExperienceMenuButton";
import {useLocation} from "react-router-dom";

interface Props {
    player: Player;
}

const ExperienceCard: React.FC<Props> = ({player}) => {
    const pathname = useLocation().pathname;

    const renderSpendExperience = () => {
        if (pathname.endsWith('/view')) {
            return <ViewFieldCard name={'Available'} value={String(player.experience.available)}/>
        } else {
            return (
                <Grid xs>
                    <Card>
                        <CenteredCardHeader title={'Available'}/>
                        <CardContent>
                            <Grid container sx={{
                                justifyContent: "center"
                            }}>
                                <SpendExperienceMenuButton player={player}/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            );
        }
    };

    return (
        <Grid xs>
            <Grid container spacing={2}>
                {renderSpendExperience()}
                <ViewFieldCard name={'Total'} value={String(player.experience.total)}/>
            </Grid>
        </Grid>
    );
};

export default ExperienceCard;