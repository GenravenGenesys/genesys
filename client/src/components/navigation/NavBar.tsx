import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {RootPath} from "../../services/RootPath";
import {useNavigate} from "react-router-dom";
import DiceRollerDialog from "../roll/DiceRollerDialog";
import {Home, Casino, List, AccountBox, Logout, Person} from "@mui/icons-material";
import {useAuth0} from "@auth0/auth0-react";

const NavBar: React.FC = () => {
    let navigate = useNavigate();
    const [openCustomRollBackDrop, setOpenCustomRollBackDrop] = useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const onClick = () => {
        navigate(RootPath.Home);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" enableColorOnDark>
                <Toolbar>
                    {/*<IconButton title='Home' size='small' onClick={(): void => onClick()}>*/}
                    {/*    <HomeIcon color='secondary' fontSize='small'/>*/}
                    {/*</IconButton>*/}
                    <IconButton title='Menu' size='medium' onClick={handleMenuClick}>
                        <List fontSize='medium' color='secondary'/>
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchor}
                        id="account-menu"
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
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
                                <Casino fontSize="small" />
                            </ListItemIcon>
                            Roll Dialog
                        </MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>GENESYS</Typography>
                    {/*<Button color='secondary' variant='contained'*/}
                    {/*        onClick={(): void => setOpenCustomRollBackDrop(true)}>Roll</Button>*/}
                    {openCustomRollBackDrop && <DiceRollerDialog open={openCustomRollBackDrop}
                                                                 onClose={(): void => setOpenCustomRollBackDrop(false)}/>}
                    { <AccountMenu />}
                    <Button color='secondary' variant='contained' onClick={handleMenuClose}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export function AccountMenu() {
    const { isAuthenticated } = useAuth0();
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
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default NavBar;