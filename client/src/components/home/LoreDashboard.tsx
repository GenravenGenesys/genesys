import {CampaignPath, LorePath} from "../../services/RootPath";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {NavigateFunction} from "react-router";
import GridContainer from "../common/grid/GridContainer";
import GridItem from "../common/grid/GridItem";

export default function LoreDashboard() {
    let navigate = useNavigate()

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Lore MainDashboard'}
                action={<Button color='primary' variant='contained' onClick={() => navigate(CampaignPath.Lore)}>Lore</Button>}>
            </CardHeader>
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