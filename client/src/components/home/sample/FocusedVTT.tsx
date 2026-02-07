import {useState} from 'react';
import {
    Box, AppBar, Toolbar, Typography,
    Grid, Card, CardContent, Button,
    Tabs, Tab,
    Paper
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useNavigate} from "react-router";
import type {Campaign} from "../../../api/model";
import {RootPath} from "../../../app/RootPath.ts";
import CampaignWizard from "./campaign-creation/CampaignWizard.tsx";

interface Props {
    campaigns: Campaign[];
}

export default function FocusedVTT(props: Props) {
    const {campaigns} = props;
    const [selectedCampaign, setSelectedCampaign] = useState(0);
    const navigate = useNavigate();

    //

    const handleTabChange = (_: any, value: number) => {
        setSelectedCampaign(value);
    };

    return (
        <Box sx={{flexGrow: 1, minHeight: '100vh', pb: 10}}>

            <AppBar position="sticky" sx={{
                bgcolor: 'rgba(5, 12, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <Toolbar>
                    <Tabs
                        value={selectedCampaign}
                        onChange={handleTabChange}
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{'& .MuiTab-root': {fontWeight: 'bold', px: 4}}}
                    >
                        {campaigns.map((c, index) => <Tab key={c.id} label={c.name} value={index}/>)}
                        <Tab label="+ New Campaign" value={campaigns.length} sx={{fontStyle: 'italic', opacity: 0.8}}/>
                    </Tabs>
                </Toolbar>
            </AppBar>

            {selectedCampaign !== campaigns.length && <Box sx={{p: {xs: 2, md: 6}, maxWidth: 1200, mx: 'auto'}}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12}}>
                        <Paper sx={{
                            p: 6,
                            borderRadius: 8,
                            background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.08) 0%, rgba(10, 25, 41, 0) 100%)',
                            textAlign: 'center',
                            border: '1px solid rgba(0, 229, 255, 0.2)'
                        }}>
                            <Typography variant="h2"
                                        sx={{fontWeight: 900, mb: 2}}>{campaigns[selectedCampaign].name}</Typography>
                            <Typography variant="h6" color="text.secondary" sx={{mb: 4}}>Active Session
                                Ready</Typography>

                            <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                                <Button variant="contained" size="large" startIcon={<PlayArrowIcon/>}
                                        sx={{px: 8, py: 2, borderRadius: 4, fontWeight: 'bold'}}>
                                    Launch VTT
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <Card>
                            <CardContent sx={{textAlign: 'center', py: 4}}>
                                <PeopleIcon sx={{fontSize: 40, color: 'primary.main', mb: 1}}/>
                                <Typography variant="h5">
                                    {campaigns[selectedCampaign].party.players.length}
                                </Typography>
                                <Button sx={{mt: 2}}
                                        onClick={() => navigate(RootPath.Campaign + campaigns[selectedCampaign].id + "/party")}>
                                    Party Management
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <Card>
                            <CardContent sx={{textAlign: 'center', py: 4}}>
                                <LibraryBooksIcon sx={{fontSize: 40, color: 'primary.main', mb: 1}}/>
                                <Typography variant="h5">
                                    {"Custom Compendium"}
                                </Typography>
                                <Button sx={{mt: 2}}
                                        onClick={() => navigate(RootPath.Campaign + campaigns[selectedCampaign].id + "/compendium")}>
                                    Open Compendium
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <Card>
                            <CardContent sx={{textAlign: 'center', py: 4}}>
                                <CalendarTodayIcon sx={{fontSize: 40, color: 'primary.main', mb: 1}}/>
                                <Typography variant="h5">
                                    Next Session: 06 Jan 2026
                                </Typography>
                                <Button sx={{mt: 2}} disabled>
                                    Schedule
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>}
            {selectedCampaign === campaigns.length && <CampaignWizard/>}
        </Box>
    );
}