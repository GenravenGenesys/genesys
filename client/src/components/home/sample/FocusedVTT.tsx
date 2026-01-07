import {useState} from 'react';
import {
    Box, AppBar, Toolbar, Typography,
    Grid2 as Grid, Card, CardContent, Button,
    Tabs, Tab,
    Paper
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {useNavigate} from "react-router";
import type {Campaign} from "../../../api/model";
import {RootPath} from "../../../services/RootPath.ts";

interface Props {
    campaigns: Campaign[];
}

export default function FocusedVTT(props: Props) {
    const {campaigns} = props;
    const [selectedCampaign, setSelectedCampaign] = useState(0);
    const navigate = useNavigate();

    const current = campaigns[selectedCampaign];

    return (
        <Box sx={{flexGrow: 1, minHeight: '100vh', pb: 10}}>

            <AppBar position="sticky" sx={{
                bgcolor: 'rgba(5, 12, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Typography variant="h6" sx={{fontWeight: 800, color: 'primary.main'}}>GENESYS ENGINE</Typography>

                    <Tabs
                        value={selectedCampaign}
                        onChange={(_, v) => setSelectedCampaign(v)}
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{'& .MuiTab-root': {fontWeight: 'bold', px: 4}}}
                    >
                        {campaigns.map((c) => <Tab key={c.id} label={c.name}/>)}
                    </Tabs>

                    <Button variant="outlined" startIcon={<AddIcon/>} size="small">New</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{p: {xs: 2, md: 6}, maxWidth: 1200, mx: 'auto'}}>

                <Grid container spacing={4}>
                    <Grid size={{xs: 12}}>
                        <Paper sx={{
                            p: 6,
                            borderRadius: 8,
                            background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.08) 0%, rgba(10, 25, 41, 0) 100%)',
                            textAlign: 'center',
                            border: '1px solid rgba(0, 229, 255, 0.2)'
                        }}>
                            <Typography variant="h2" sx={{fontWeight: 900, mb: 2}}>{current.name}</Typography>
                            <Typography variant="h6" color="text.secondary" sx={{mb: 4}}>Active Session
                                Ready</Typography>

                            <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                                <Button variant="contained" size="large" startIcon={<PlayArrowIcon/>}
                                        sx={{px: 8, py: 2, borderRadius: 4, fontWeight: 'bold'}}>
                                    Launch VTT
                                </Button>
                                {/*<Button variant="outlined" size="large" startIcon={<SettingsIcon/>}*/}
                                {/*        sx={{borderRadius: 4}}>*/}
                                {/*    Rules & Settings*/}
                                {/*</Button>*/}
                            </Box>
                        </Paper>
                    </Grid>

                    {/*<Grid size={{xs: 12, md: 4}}>*/}
                    {/*    <Card>*/}
                    {/*        <CardContent sx={{textAlign: 'center', py: 4}}>*/}
                    {/*            <PeopleIcon sx={{fontSize: 40, color: 'primary.main', mb: 1}}/>*/}
                    {/*            <Typography variant="h4">{5}</Typography>*/}
                    {/*            <Button sx={{mt: 2}}>Invite Players</Button>*/}
                    {/*        </CardContent>*/}
                    {/*    </Card>*/}
                    {/*</Grid>*/}

                    <Grid size={{xs: 12, md: 4}}>
                        <Card>
                            <CardContent sx={{textAlign: 'center', py: 4}}>
                                <LibraryBooksIcon sx={{fontSize: 40, color: 'primary.main'}}/>
                                <Typography variant="h4">{"Custom Files"}</Typography>
                                <Button onClick={() => navigate(RootPath.Campaign + current.id + "/compendium")}>Open
                                    Compendium</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <Card>
                            <CardContent sx={{textAlign: 'center', py: 4}}>
                                <Typography variant="h4">06 Jan 2026</Typography>
                                <Typography variant="body2" color="text.secondary">Next Session Date</Typography>
                                <Button sx={{mt: 2}}>Schedule</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    );
}