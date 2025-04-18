import {useNavigate} from "react-router-dom";

import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewFieldCard from "../common/ViewFieldCard";
import * as React from "react";
import Spell from "../../models/spell/Spell";
import {ViewSpellSkillCard} from "./SpellSkillCard";
import SpellEffectCard from "./effect/SpellEffectCard";
import {RootPath} from "../../services/RootPath";

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
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Description'} value={spell.description}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>

                    </Grid>
                    <Grid container spacing={2}>
                        <ViewSpellSkillCard spell={spell}/>
                    </Grid>
                    <Grid container spacing={2}>
                        <SpellEffectCard spell={spell}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}