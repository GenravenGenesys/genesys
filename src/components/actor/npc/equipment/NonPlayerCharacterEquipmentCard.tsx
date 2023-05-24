import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useState} from "react";
import ViewActorWeaponTable from "./weapon/ViewActorWeaponTable";
import CreateWeaponDialog from "./weapon/CreateWeaponDialog";
import WeaponSelectionDialog from "../../common/equipment/WeaponSelectionDialog";
import ViewActorArmorTable from "./ViewActorArmorTable";
import ArmorSelectionDialog from "../../common/equipment/ArmorSelectionDialog";
import CreateArmorDialog from "./CreateArmorDialog";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterEquipmentCard(props: Props): JSX.Element {
    const {npc} = props
    const [value, setValue] = useState('1')
    const [openCreateWeaponDialog, setOpenCreateWeaponDialog] = useState(false)
    const [openCreateArmorDialog, setOpenCreateArmorDialog] = useState(false)
    const [openAddWeaponDialog, setOpenAddWeaponDialog] = useState(false)
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderWeaponsTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderWeaponsTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateWeaponDialog(true)}>Create Weapon</Button>
                {openCreateWeaponDialog && <CreateWeaponDialog actor={npc} open={openCreateWeaponDialog} onClose={(): void => setOpenCreateWeaponDialog(false)}/>}
                <Button color='primary' variant='contained' onClick={(): void => setOpenAddWeaponDialog(true)}>Add Weapon</Button>
                {openAddWeaponDialog && <WeaponSelectionDialog actor={npc} open={openAddWeaponDialog} onClose={(): void => setOpenAddWeaponDialog(false)}/>}
            </Fragment>
        )
    }

    const renderWeaponsTable = (): JSX.Element => {
        if (npc?.weapons!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewActorWeaponTable weapons={npc?.weapons!!} brawn={npc?.brawn?.current!!} />
    }

    const renderArmorTab = (): JSX.Element => {
        return (
            <Fragment>
                {renderArmorTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateArmorDialog(true)}>Create Weapon</Button>
                {openCreateArmorDialog && <CreateArmorDialog actor={npc} open={openCreateArmorDialog} onClose={(): void => setOpenCreateArmorDialog(false)}/>}
                <Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add Armor</Button>
                {openSelectArmorDialog && <ArmorSelectionDialog actor={npc} open={openSelectArmorDialog} onClose={(): void => setOpenSelectArmorDialog(false)}/>}
            </Fragment>
        )
    }

    const renderArmorTable = (): JSX.Element => {
        if (npc?.armor!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <ViewActorArmorTable armor={npc?.armor!!}/>
    }

    const addGear = () => {

    }

    const renderGearTab = (): JSX.Element => {
        return (
            <Fragment>
                {/*{renderGearTable()}*/}
                <Button color='primary' variant='contained' onClick={addGear}>Add Gear</Button>
            </Fragment>
        )
    }

    const renderGearTable = (): JSX.Element => {
        if (npc?.gear!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <Fragment/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Equipment'} style={{textAlign:'center'}}/>
            <CardContent>
                <Grid sx={{ width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
}