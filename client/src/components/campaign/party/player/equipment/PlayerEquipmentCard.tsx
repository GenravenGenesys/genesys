import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Player from "../../../../../models/actor/player/Player";
import PlayerArmorTable from "./armor/PlayerArmorTable";
import PlayerWeaponTable from "./weapon/PlayerWeaponTable";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import { useLocation } from "react-router-dom";
import PlayerWeaponSelectionDialog from "./weapon/PlayerWeaponSelectionDialog";
import PlayerArmorSelectionDialog from "./armor/PlayerArmorSelectionDialog";
import PlayerArmorEquipDialog from "./armor/PlayerArmorEquipDialog";
import PlayerWeaponEquipDialog from "./weapon/PlayerWeaponEquipDialog";
import React, {Fragment, useState} from "react";

interface Props {
    player: Player;
}

const PlayerEquipmentCard: React.FC<Props> = ({ player }) => {
    const [value, setValue] = useState('1');
    const [openSelectWeaponDialog, setOpenSelectWeaponDialog] = useState(false);
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false);
    const [openEquipArmorDialog, setOpenEquipArmorDialog] = useState(false);
    const [openEquipWeaponDialog, setOpenEquipWeaponDialog] = useState(false);
    const pathname = useLocation().pathname;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const renderWeaponsTab = () => {
        return (
            <Fragment>
                {player.weapons === undefined || player.weapons.length === 0 ?
                    <Typography style={{ textAlign: 'center' }}>None</Typography> :
                    <PlayerWeaponTable weapons={player.weapons} player={player} />}
                {pathname.endsWith('/edit') && <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectWeaponDialog(true)}>Add
                        Weapon</Button>
                    {openSelectWeaponDialog &&
                        <PlayerWeaponSelectionDialog player={player} open={openSelectWeaponDialog}
                                                     onClose={(): void => setOpenSelectWeaponDialog(false)} />}
                    <Button color='primary' variant='contained' onClick={(): void => setOpenEquipWeaponDialog(true)}>Equip
                        Weapon</Button>
                    {openEquipWeaponDialog && <PlayerWeaponEquipDialog player={player} open={openEquipWeaponDialog}
                                                                       onClose={(): void => setOpenEquipWeaponDialog(false)} />}
                </Fragment>}
            </Fragment>
        )
    };

    const renderArmorTab = () => {
        return (
            <Fragment>
                {player.armors === undefined || player.armors.length === 0 ?
                    <Typography style={{ textAlign: 'center' }}>None</Typography> :
                    <PlayerArmorTable armor={player.armors} />}
                {pathname.endsWith('/edit') && <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add
                        Armor</Button>
                    {openSelectArmorDialog && <PlayerArmorSelectionDialog player={player} open={openSelectArmorDialog}
                                                                          onClose={(): void => setOpenSelectArmorDialog(false)} />}
                    <Button color='primary' variant='contained' onClick={(): void => setOpenEquipArmorDialog(true)}>Equip
                        Armor</Button>
                    {openEquipArmorDialog && <PlayerArmorEquipDialog player={player} open={openEquipArmorDialog}
                                                                     onClose={(): void => setOpenEquipArmorDialog(false)} />}
                </Fragment>}
            </Fragment>
        )
    };

    const addGear = () => {
        // Your add gear logic here
    };

    const renderGearTab = () => {
        return (
            <Fragment>
                {player.gear === undefined || player.gear.length === 0 ?
                    <Typography style={{ textAlign: 'center' }}>None</Typography> : <Fragment />}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    };

    return (
        <Card sx={{ "width": 1 }}>
            <CenteredCardHeader title={'Equipment'} />
            <CardContent>
                <Grid sx={{ width: 1 }}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Weapons" value="1" />
                                <Tab label="Armor" value="2" />
                                <Tab label="Gear" value="3" />
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
};

export default PlayerEquipmentCard;
