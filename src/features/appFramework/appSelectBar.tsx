import React, { useState } from "react";
import { AppBarItem } from "../../types";
import { ApplicationContextType, useApplication } from "../../context/applicationContext";
import  { CommandCenterApplicationEnum } from "../../enums";
import { Drawer, List, ListItem, ListItemButton, Box, Toolbar, AppBar, IconButton, Typography, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";

interface AppBarProps {
    appItems: AppBarItem[];
}

export const AppSelectBar: React.FC<AppBarProps> = (props) => {

    const appBarWidth:number = 240;

    const {currentApplication:currentApplication, setCurrentApplication:handleSetCurrentApplication}:ApplicationContextType = useApplication();
    const [openAppBar, setOpenAppBar] = useState<boolean>(false);

    const handleApplicationClick = (application: CommandCenterApplicationEnum) => {
        handleSetCurrentApplication(application);
    }

    const handleAppBarOpen = () => {
        setOpenAppBar(true);
    }

    const handleAppBarClose = () => {
        setOpenAppBar(false);
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleAppBarOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {currentApplication}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: appBarWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: appBarWidth,
                        boxSizing: 'border-box',   
                    },
                }}
                anchor="left"
                open={openAppBar}
                onClose={handleAppBarClose}
            >
                <Box
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        py: 1.5
                    }}
                >
                    <IconButton onClick={handleAppBarClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Box>
                <Divider/>
                <List>
                    {props.appItems.map((item, _) => (
                        <ListItem 
                            key={item.id} 
                            disablePadding 
                            onClick={() => {
                                handleApplicationClick(item.application)
                            }}
                            component={Link} 
                            to={item.route}
                        >
                            <ListItemButton >
                                {item.application}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}