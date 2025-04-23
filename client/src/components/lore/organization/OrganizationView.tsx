import {useNavigate} from "react-router-dom";
import {Organization} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/RootPath";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import OrganizationSidebar from "./OrganizationSidebar";

interface Props {
    organization: Organization
}

export default function OrganizationView(props: Props) {
    const {organization} = props
    const path = LorePath.Organization
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + organization.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={organization.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container sx={{
                    justifyContent: 'center'
                }}>
                    <Grid container spacing={10}>
                        <Grid xs={8}>

                        </Grid>
                        <Grid xs={4}>
                            <OrganizationSidebar organization={organization} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}