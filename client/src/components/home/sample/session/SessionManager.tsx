import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    Chip,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider,
    Grid,
    List, ListItem, ListItemText, Paper,
    Stack, TextField,
    Typography
} from "@mui/material";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AdjustIcon from "@mui/icons-material/Adjust";
import {CampaignSessionStatus} from "../../../../api/model";
import {useGetSessions} from "../../../../hooks/campaign/useGetSessions.ts";
import {RootPath} from "../../../../services/RootPath.ts";

export default function SessionManager() {
    const {id} = useParams<{ id: string }>();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Move all hooks before conditional returns
    const {campaign, isLoading: isCampaignLoading} = useCampaignLive(id || '');
    const {data: response, isLoading: isSessionsLoading} = useGetSessions(campaign?.id || '');
    // const {data: response, isLoading: isSessionsLoading} = useGetAllCampaignSessions(campaign?.id || '');

    if (!id || !campaign) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    if (isCampaignLoading || isSessionsLoading) {
        return <CircularProgress/>;
    }

    // const sessions = response?.data || [];
    const sessions = response || [];

    const handleCreateSession = () => {
        // TODO: Implement session creation logic
        setOpen(false);
    };

    return (
        <Box sx={{p: 4, bgcolor: '#0a0a0a', minHeight: '100vh', color: 'white'}}>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="900">Session Manager</Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>
                    Plan New Session
                </Button>
            </Stack>

            <Grid container spacing={3}>
                <Grid size={{xs: 12}}>
                    <Typography variant="h6" sx={{mb: 2, color: 'primary.main'}}>Upcoming Adventures</Typography>
                    <Grid container spacing={3}>
                        {sessions.filter(s => s.status !== CampaignSessionStatus.Resolved).map(session => (
                            <Grid size={{xs: 12, md: 4}} key={session.id}>
                                <Card sx={{
                                    bgcolor: '#1a1a1a',
                                    color: 'white',
                                    borderRadius: 3,
                                    border: CampaignSessionStatus.Planning ? '1px dashed #555' : '1px solid #333'
                                }}>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="h6">{session.id}</Typography>
                                            {session.status === CampaignSessionStatus.Planning && <Chip
                                                label={session.status}
                                                size="small"
                                                color={'info'}
                                            />}
                                            {session.status === CampaignSessionStatus.Ready && <Chip
                                                label={session.status}
                                                size="small"
                                                color={'success'}
                                            />}
                                            {session.status === CampaignSessionStatus.Active && <Chip
                                                label={session.status}
                                                size="small"
                                                color={'error'}
                                            />}
                                        </Stack>
                                        <Typography variant="caption"
                                                    color="gray">Date: {session.sessionDate}</Typography>
                                    </CardContent>
                                    <CardActions sx={{p: 2, pt: 0}}>
                                        {session.status === CampaignSessionStatus.Planning &&
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ConstructionIcon/>}
                                                color={'info'}
                                                onClick={() => navigate(RootPath.Campaign + campaign.id + RootPath.Session + session.id)}
                                            >
                                                Continue Preparations
                                            </Button>
                                        }
                                        {session.status === CampaignSessionStatus.Ready &&
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<PlayArrowIcon/>}
                                                color={'success'}
                                                onClick={() => navigate(RootPath.Campaign + campaign.id + RootPath.Session + session.id)}
                                            >
                                                Ready to Begin
                                            </Button>
                                        }
                                        {session.status === CampaignSessionStatus.Active &&
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<AdjustIcon/>}
                                                color={'error'}
                                                onClick={() => navigate(RootPath.Campaign + campaign.id + RootPath.Session + session.id)}
                                            >
                                                Currently Active
                                            </Button>
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid size={{xs: 12}} sx={{mt: 4}}>
                    <Paper sx={{bgcolor: '#1a1a1a', p: 0, borderRadius: 3, overflow: 'hidden'}}>
                        <Box sx={{p: 2, bgcolor: '#222'}}>
                            <Typography variant="h6">Session History</Typography>
                        </Box>
                        <List>
                            {sessions.filter(s => s.status === CampaignSessionStatus.Resolved).map((session, index) => (
                                <React.Fragment key={session.id}>
                                    <ListItem secondaryAction={<Button size="small">View Logs</Button>}>
                                        <ListItemText
                                            primary={session.id}
                                            secondary={`${session.sessionDate} • ${session.party.players.length} Players Attended`}
                                            slotProps={{secondary: {style: {color: 'gray'}}}}
                                        />
                                    </ListItem>
                                    {index < sessions.length - 1 && <Divider sx={{bgcolor: '#333'}}/>}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}
                    slotProps={{paper: {sx: {bgcolor: '#1a1a1a', color: 'white'}}}}
            >
                <DialogTitle>Plan New Session</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{mt: 1, minWidth: 400}}>
                        <TextField fullWidth label="Session Title" variant="filled"
                                   sx={{bgcolor: '#333', borderRadius: 1}}
                                   slotProps={{
                                       inputLabel: {style: {color: 'gray'}},
                                       input: {style: {color: 'white'}}
                                   }}/>
                        <TextField fullWidth label="Target Date" type="date" variant="filled" defaultValue="2026-01-14"
                                   sx={{bgcolor: '#333', borderRadius: 1}}
                                   slotProps={{
                                       inputLabel: {shrink: true, style: {color: 'gray'}},
                                       input: {style: {color: 'white'}}
                                   }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button onClick={() => setOpen(false)} sx={{color: 'gray'}}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateSession}>Save Plan</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}