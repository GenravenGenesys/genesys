import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {GenesysDifficultyCenterTableCell, TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import * as React from "react";
import Spell, {Effect} from "../../../models/spell/Spell";
import {Difficulty} from "../../../models/common/Difficulty";
import {Fragment, useState} from "react";
import {useLocation} from "react-router";
import CreateSpellEffectDialog from "./CreateSpellEffectDialog";

interface Props {
    spell: Spell
}

export default function SpellEffectCard(props: Props) {
    const {spell} = props
    const [openCreateSpellEffectDialog, setOpenCreateSpellEffectDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderDifficulty = (effect: Effect) => {
        if (effect.increase === 0) {
            return <GenesysDescriptionTypography text={'-'}/>
        } else {
            switch (effect.increase) {
                case 1:
                    return <GenesysDifficultyCenterTableCell difficulty={Difficulty.Easy}/>
                case 2:
                    return <GenesysDifficultyCenterTableCell difficulty={Difficulty.Average}/>
                case 3:
                    return <GenesysDifficultyCenterTableCell difficulty={Difficulty.Hard}/>
                case 4:
                    return <GenesysDifficultyCenterTableCell difficulty={Difficulty.Daunting}/>
            }
        }
        return <Fragment/>
    }

    const renderTableBody = () => {
        if (!spell.effects) {
            return <GenesysDescriptionTypography text={'None'}/>
        } else {
            return (
                <TableBody>
                    {spell.effects.map((effect: Effect) => (
                        <TableRow key={effect.name}>
                            <TypographyCenterTableCell value={effect.name}/>
                            <TypographyCenterTableCell value={effect.description}/>
                            {renderDifficulty(effect)}
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    const renderCreateSpellEffectButton = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained'
                            onClick={(): void => setOpenCreateSpellEffectDialog(true)}>Create
                        Spell Effect</Button>
                    {openCreateSpellEffectDialog &&
                        <CreateSpellEffectDialog open={openCreateSpellEffectDialog}
                                                 onClose={(): void => setOpenCreateSpellEffectDialog(false)}
                                                 spell={spell}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Additional Effects'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                {renderCreateSpellEffectButton()}
            </CardActions>
        </Card>
    )
}