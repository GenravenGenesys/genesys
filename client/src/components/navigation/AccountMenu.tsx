import {useAuth0} from "@auth0/auth0-react";
import React, {Fragment} from "react";
import {Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {AccountBox, Login, Logout, Person, PersonAdd} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const AccountMenu: React.FC = () => {
    let navigate = useNavigate();
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<null | HTMLElement>(null);
    const open = Boolean(accountMenuAnchor);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAccountMenuAnchor(null);
    };

    const handleLoginClick = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                prompt: "login",
            },
        });
        setAccountMenuAnchor(null);
    };

    const handleSignupClick = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                prompt: "login",
                screen_hint: "signup",
            },
        });
        setAccountMenuAnchor(null);
    };

    const handleProfileClick = () => {
        navigate("/profile");
        setAccountMenuAnchor(null);
    };

    const handleLogoutClick = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
        setAccountMenuAnchor(null);
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
                anchorEl={accountMenuAnchor}
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
                    <MenuItem onClick={handleLoginClick}>
                        <ListItemIcon>
                            <Login fontSize="small"/>
                        </ListItemIcon>
                        Login
                    </MenuItem>
                    <MenuItem onClick={handleSignupClick}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small"/>
                        </ListItemIcon>
                        Signup
                    </MenuItem>
                </Fragment>)}
                {isAuthenticated && (<Fragment>
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>
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