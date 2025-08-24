import {Card, CardContent, CardHeader, Divider, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate} from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import {Gear} from "../../../../models/equipment/Gear";
import {EquipmentPath} from "../../../../services/RootPath";
import ViewFieldCard from "../../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../../common/NumberCheckBox";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    gear: Gear
}

export default function GearView(props: Props) {
    const {gear} = props
    const path = EquipmentPath.Gear
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(path + gear.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={gear.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={10}>
                        <ViewFieldCard name={'Description'} value={gear.description}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={10}>
                        <ViewFieldCard name={'Required Skill'} value={String(gear.skill.name)}/>
                        <ViewFieldCard name={'Range'} value={String(gear.range)}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={10}>
                        <ViewFieldCard name={'Encumbrance'} value={String(gear.encumbrance)}/>
                        <ViewNumberCheckBoxCard title={'Price'} check={gear.restricted} value={gear.price}
                                                checkTitle={'Restricted'}/>
                        <ViewFieldCard name={'Rarity'} value={String(gear.rarity)}/>
                    </GridContainer>
                </GridContainer>
            </CardContent>
        </Card>
    );
}
