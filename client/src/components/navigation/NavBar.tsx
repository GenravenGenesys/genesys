import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, IconButton} from "@mui/material";
import * as React from "react";
import CustomRollDialog from "../roll/CustomRollDialog";
import {useEffect, useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {Path} from "../../services/Path";
import {useNavigate} from "react-router-dom";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import RollDialog from "../roll/RollDialog";
import {DefaultRoll} from "../../models/Roll";

export default function NavBar() {
    let navigate = useNavigate()
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false)
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const current = await SettingService.getCurrentSetting()
            if (!current) {
                return
            }
            setSetting(current)
        })()
    }, [setSetting])

    const onClick = () => {
        navigate(Path.Home)
    }

    const getSetting = (): string => {
        return 'Current Setting: ' + setting?.name!!
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" enableColorOnDark>
            <Toolbar>
                <IconButton title='Home' size='small' onClick={(): void => onClick()}>
                    <HomeIcon color='secondary' fontSize='small' />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>GENESYS</Typography>
                <Typography sx={{ flexGrow: 1, align: "center" }}>{getSetting()}</Typography>
                {/*<Button color='secondary' variant='contained' onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>*/}
                {/*{openCustomRollBackDrop && <CustomRollDialog open={openCustomRollBackDrop} onClose={(): void => setOpenCustomRollBackDrop(false)}/>}*/}
                <Button color='secondary' variant='contained' onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>
                {openCustomRollBackDrop && <RollDialog open={openCustomRollBackDrop} onClose={(): void => setOpenCustomRollBackDrop(false)} diceRoll={DefaultRoll.create()}/>}
            </Toolbar>
          </AppBar>
        </Box>
      )
}