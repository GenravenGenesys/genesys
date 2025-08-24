import {CampaignPath, LorePath} from "../../services/RootPath";
import {Button, Card, CardContent} from "@mui/material";
import {LoreType} from "../../models/lore/Lore";
import {useNavigate} from "react-router-dom";
import GridContainer from "../common/grid/GridContainer";
import GridItem from "../common/grid/GridItem";
import CenteredCardHeaderWithButton from "../common/card/header/CenteredCardHeaderWithButton";
import type {NavigateFunction} from "react-router-dom";

export default function LoreDashboard() {
    const navigate = useNavigate()

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