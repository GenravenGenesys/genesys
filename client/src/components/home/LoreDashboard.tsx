import {CampaignPath, LorePath} from "../../services/RootPath";
import {useNavigate} from "react-router";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {NavigateFunction} from "react-router";
import GridContainer from "../common/grid/GridContainer";
import GridItem from "../common/grid/GridItem";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton";

export default function LoreDashboard() {
    let navigate = useNavigate()

    return (
        <Card sx={{width: 1}}>
            <CenteredCardHeaderWithButton title={'Campaign Lore'} onClick={() => navigate(CampaignPath.Lore)}
                                          buttonText={'Create Lore'}/>
            <CardContent>
                <GridContainer centered>
                    <GridItem>
                        <DashboardButton path={LorePath.Organization} title={LoreType.ORGANIZATION}
                                         navigate={navigate}/>
                    </GridItem>
                </GridContainer>
            </CardContent>
        </Card>
    );
}

interface DashboardProps {
    path: LorePath
    title: string
    navigate: NavigateFunction
}

function DashboardButton(props: DashboardProps) {
    const {path, title, navigate} = props
    return (
        <Button color='primary' variant='contained' onClick={() => navigate(path)}>{title}</Button>
    )
}