import {useAuth0} from "@auth0/auth0-react";
import React, {Fragment} from "react";
import {Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {AccountBox, Logout, Person} from "@mui/icons-material";

const AccountMenu: React.FC = () => {
    const {isAuthenticated} = useAuth0();
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
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="My Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <AccountBox sx={{width: 32, height: 32}}>M</AccountBox>
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
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {!isAuthenticated && (<Fragment>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Login
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Signup
                    </MenuItem>
                </Fragment>)}
                {isAuthenticated && (<Fragment>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Fragment>)}
            </Menu>
        </React.Fragment>
    );
};

export default AccountMenu;