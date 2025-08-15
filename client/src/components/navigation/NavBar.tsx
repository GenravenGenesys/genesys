import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, IconButton} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {RootPath} from "../../services/RootPath";
import {useNavigate} from "react-router-dom";
import DiceRollerDialog from "../roll/DiceRollerDialog";

export default function NavBar() {
    let navigate = useNavigate()
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false)

    const onClick = () => {
        navigate(RootPath.Home)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" enableColorOnDark>
            <Toolbar>
                <IconButton title='Home' size='small' onClick={(): void => onClick()}>
                    <HomeIcon color='secondary' fontSize='small' />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>GENESYS</Typography>
                <Button color='secondary' variant='contained' onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>
                {openCustomRollBackDrop && <DiceRollerDialog open={openCustomRollBackDrop} onClose={(): void => setOpenCustomRollBackDrop(false)}/>}
            </Toolbar>
          </AppBar>
        </Box>
      )
}