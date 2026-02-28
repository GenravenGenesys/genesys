import {useOptionalAuth0} from "../../hooks/useOptionalAuth0";
import React from "react";
import {Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {AccountBox, Login, Logout, Person, PersonAdd} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const AccountMenu: React.FC = () => {
    const navigate = useNavigate();
    const {isAuthenticated, loginWithRedirect, logout} = useOptionalAuth0();
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
                {!isAuthenticated && [
                    <MenuItem key="login" onClick={handleLoginClick}>
                        <ListItemIcon>
                            <Login fontSize="small"/>
                        </ListItemIcon>
                        Login
                    </MenuItem>,
                    <MenuItem key="signup" onClick={handleSignupClick}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small"/>
                        </ListItemIcon>
                        Signup
                    </MenuItem>
                ]}
                {isAuthenticated && [
                    <MenuItem key="profile" onClick={handleProfileClick}>
                        <ListItemIcon>
                            <Person fontSize="small"/>
                        </ListItemIcon>
                        Profile
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                ]}
            </Menu>
        </React.Fragment>
    );
};

export default AccountMenu;