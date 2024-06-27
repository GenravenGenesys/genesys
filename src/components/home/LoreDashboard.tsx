import {LorePath, RootPath} from "../../services/RootPath";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import {LoreType} from "../../models/lore/Lore";
import {NavigateFunction} from "react-router";

export default function LoreDashboard(): JSX.Element {
    let navigate = useNavigate()

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Lore MainDashboard'}
                action={<Button color='primary' variant='contained' onClick={() => navigate(RootPath.Lore)}>Lore</Button>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid item xs>
                        <DashboardButton path={LorePath.Organization} title={LoreType.ORGANIZATION}
                                         navigate={navigate}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

interface DashboardProps {
    path: LorePath
    title: string
    navigate: NavigateFunction
}

function DashboardButton(props: DashboardProps): JSX.Element {
    const {path, title, navigate} = props
    return (
        <Button color='primary' variant='contained' onClick={() => navigate(path)}>{title}</Button>
    )
}