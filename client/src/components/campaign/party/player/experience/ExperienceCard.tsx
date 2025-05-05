import Player from "../../../../../models/actor/player/Player";
import {Card, CardContent} from "@mui/material";
import ViewFieldCard from "../../../../common/ViewFieldCard";
import * as React from "react";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import SpendExperienceMenuButton from "./SpendExperienceMenuButton";
import {useLocation} from "react-router";
import GridItem from "../../../../common/grid/GridItem";
import GridContainer from "../../../../common/grid/GridContainer";

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
                <GridItem>
                    <Card>
                        <CenteredCardHeader title={'Available'}/>
                        <CardContent>
                            <GridContainer centered>
                                <SpendExperienceMenuButton player={player}/>
                            </GridContainer>
                        </CardContent>
                    </Card>
                </GridItem>
            );
        }
    };

    return (
        <GridItem>
            <GridContainer spacing={2}>
                {renderSpendExperience()}
                <ViewFieldCard name={'Total'} value={String(player.experience.total)}/>
            </GridContainer>
        </GridItem>
    );
};

export default ExperienceCard;