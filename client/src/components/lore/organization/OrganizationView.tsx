import {useNavigate} from "react-router";
import {Organization} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/RootPath";
import {Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import OrganizationSidebar from "./OrganizationSidebar";
import GridContainer from "../../common/grid/GridContainer";
import GridItem from "../../common/grid/GridItem";

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
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <GridContainer centered>
                    <GridItem width={.75}>

                    </GridItem>
                    <GridItem width={.25}>
                        <OrganizationSidebar organization={organization}/>
                    </GridItem>
                </GridContainer>
            </CardContent>
        </Card>
    );
}