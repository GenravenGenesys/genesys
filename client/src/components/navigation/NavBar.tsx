import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CasinoIcon from '@mui/icons-material/Casino';
import { RootPath } from "../../services/RootPath";
import { useNavigate } from "react-router";
import DiceRollerDialog from "../roll/DiceRollerDialog";
import { AccountBox, Logout, Home, Person } from '@mui/icons-material';
import { useKeycloak } from '@react-keycloak/web';

export default function NavBar() {
  let navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    navigate(RootPath.Home);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton title='Menu' size='medium' onClick={handleClick}>
            <MenuIcon fontSize='medium' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={onClick}>
              <ListItemIcon>
                <Home fontSize="small" />
              </ListItemIcon>
              Home
            </MenuItem>
            <MenuItem onClick={() => setOpenCustomRollBackDrop(true)}>
              <ListItemIcon>
                <CasinoIcon fontSize="small" />
              </ListItemIcon>
              Roll Dialog
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>GENESYS</Typography>
          {openCustomRollBackDrop && <DiceRollerDialog open={openCustomRollBackDrop} onClose={() => setOpenCustomRollBackDrop(false)} />}
          { keycloak.authenticated && <AccountMenu />}
          <Button onClick={() => keycloak.login()}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export function AccountMenu() {
  const { keycloak } = useKeycloak();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountBox sx={{ width: 32, height: 32 }}>M</AccountBox>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Account
            </MenuItem>
            <MenuItem onClick={() => keycloak.logout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
