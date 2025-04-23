import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CreateActorDialog from "../campaign/actor/common/CreateActorDialog";
import ExpansionList from "../navigation/ExpansionList";
import CenteredCardHeader from "../common/card/header/CenteredCardHeader";
import {ActorType} from "../../models/actor/Actor";
import {ActorPath} from "../../services/RootPath";

export default function ActorDashboard() {
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false)

    return (
        <Card>
            <CenteredCardHeader title={'Actor MainDashboard'}/>
            <CardContent>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    <ExpansionList header={'View Players'} viewTitle={'View Players'} to={ActorPath.Player}
                                   dialogTitle={'Create Player'}
                                   onClick={(): void => setOpenPlayerCreationDialog(true)}/>
                </Grid>
            </CardContent>
            {openPlayerCreationDialog && <CreateActorDialog open={openPlayerCreationDialog}
                                                            onClose={(): void => setOpenPlayerCreationDialog(false)}
                                                            actorType={ActorType.Player}/>}
        </Card>
    );
}