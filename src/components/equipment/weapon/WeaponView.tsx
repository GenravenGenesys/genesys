import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import Setting from "../../../models/Setting";
import ViewSettingsCard from "../../common/ViewSettingsCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

interface Props {
    weapon: Weapon
    allSettings: Setting[]
}

export default function WeaponView(props: Props) {
    const {weapon, allSettings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(EquipmentPath.Weapon + name + '/edit')
    }

    const renderDamage = (): string => {
        let damage = ''
        if (weapon?.brawn!!) {damage = 'Brawn + ' + weapon?.damage!!}
        else {damage = String(weapon?.damage!!)}
        return damage
    }

    const renderPrice = (): string => {
        let price = ''
        if (weapon?.restricted!!) {price = weapon?.price!! + '(R)'}
        else {price = String(weapon?.price!!)}
        return price
    }

    const renderQualities = (): string => {
        let qualities = ''
        if (weapon?.qualities!!.length > 0) {
            for (const quality of weapon.qualities.sort((a, b) => a.name.localeCompare(b.name))) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ' ')
            }
        }
        else {qualities = 'None'}
        return qualities
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={weapon?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon?.description!!} />
                    </Grid>
                    <Divider />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TypographyLeftTableCell value={'Name'}/>
                                    <TypographyCenterTableCell value={'Skill'}/>
                                    <TypographyCenterTableCell value={'Damage'}/>
                                    <TypographyCenterTableCell value={'Critical'}/>
                                    <TypographyCenterTableCell value={'Range'}/>
                                    <TypographyCenterTableCell value={'Price'}/>
                                    <TypographyCenterTableCell value={'Special Qualities'}/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TypographyLeftTableCell value={weapon?.name!!}/>
                                    <TypographyCenterTableCell value={weapon?.skill?.name!!}/>
                                    <TypographyCenterTableCell value={renderDamage()}/>
                                    <TypographyCenterTableCell value={String(weapon?.critical!!)}/>
                                    <TypographyCenterTableCell value={weapon?.range!!}/>
                                    <TypographyCenterTableCell value={renderPrice()}/>
                                    <TypographyCenterTableCell value={renderQualities()}/>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewSettingsCard settingIds={weapon?.settings!!} allSettings={allSettings} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
