import {useNavigate} from "react-router";
import {Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewFieldCard from "../common/ViewFieldCard";
import * as React from "react";
import Spell from "../../models/spell/Spell";
import {ViewSpellSkillCard} from "./SpellSkillCard";
import SpellEffectCard from "./effect/SpellEffectCard";
import {RootPath} from "../../services/RootPath";
import GridContainer from "../common/grid/GridContainer";

interface Props {
    spell: Spell
}

export default function SpellView(props: Props):JSX.Element {
    const {spell} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(RootPath.Spell + spell.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={spell.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={2}>
                        <ViewFieldCard name={'Description'} value={spell.description}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={2}>

                    </GridContainer>
                    <GridContainer spacing={2}>
                        <ViewSpellSkillCard spell={spell}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <SpellEffectCard spell={spell}/>
                    </GridContainer>
                </GridContainer>
            </CardContent>
        </Card>
    );
}