import {Button, Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import Player from "../../../../models/actor/player/Player";
import PlayerArmorTable from "./armor/PlayerArmorTable";
import PlayerWeaponTable from "./weapon/PlayerWeaponTable";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {useLocation} from "react-router-dom";
import PlayerWeaponSelectionDialog from "./weapon/PlayerWeaponSelectionDialog";
import PlayerArmorSelectionDialog from "./armor/PlayerArmorSelectionDialog";

interface Props {
    player: Player
}

export default function PlayerEquipmentCard(props: Props): JSX.Element {
    const {player} = props
    const [value, setValue] = useState('1')
    const [openSelectWeaponDialog, setOpenSelectWeaponDialog] = useState(false)
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false)
    const pathname = useLocation().pathname

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                {renderWeaponTableButton()}
            </Fragment>
        )
    }

    const renderWeaponsTable = (): JSX.Element => {
        if (player.weapons === undefined || player.weapons.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <PlayerWeaponTable weapons={player.weapons} player={player}/>
    }

    const renderWeaponTableButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectWeaponDialog(true)}>Add
                        Weapon</Button>
                    {openSelectWeaponDialog && <PlayerWeaponSelectionDialog player={player} open={openSelectWeaponDialog}
                                                                      onClose={(): void => setOpenSelectWeaponDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    const renderArmorTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderArmorTable()}
                {renderArmorTableButton()}
            </Fragment>
        )
    }

    const renderArmorTable = (): JSX.Element => {
        if (player.armor === undefined || player.armor.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <PlayerArmorTable armor={player.armor}/>
    }

    const renderArmorTableButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add
                        Weapon</Button>
                    {openSelectArmorDialog && <PlayerArmorSelectionDialog player={player} open={openSelectArmorDialog}
                                                                            onClose={(): void => setOpenSelectArmorDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    const addGear = () => {

    }

    const renderGearTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderGearTable()}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    }

    const renderGearTable = (): JSX.Element => {
        if (player.gear === undefined || player.gear.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Equipment'}/>
            <CardContent>
                <Grid sx={{width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Weapons" value="1"/>
                                <Tab label="Armor" value="2"/>
                                <Tab label="Gear" value="3"/>
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderWeaponsTab()}</TabPanel>
                        <TabPanel value="2">{renderArmorTab()}</TabPanel>
                        <TabPanel value="3">{renderGearTab()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}