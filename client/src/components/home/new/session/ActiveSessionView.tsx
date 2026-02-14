import React, {Fragment, useState} from 'react';
import {
    Box, Typography, Grid, Paper, List, ListItem, ListItemIcon,
    ListItemText, Button, Chip, Divider, Card, CardMedia, CardContent,
    Avatar, Badge, Stack, IconButton, Tooltip, CircularProgress
} from '@mui/material';

// Material Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import GavelIcon from '@mui/icons-material/Gavel';
import ForumIcon from '@mui/icons-material/Forum';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EncounterManager from "./EncounterManager.tsx";
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import {useGetCampaignSession} from "../../../../api/generated/sessions/sessions.ts";
import {
    type CampaignEncounter, CampaignEncounterEncounterStatus,
    CampaignEncounterEncounterType,
    type CampaignScene,
    type CampaignSession, CampaignSessionStatus, type Threshold
} from "../../../../api/model";
import {useGetSessions} from "../../../../hooks/campaign/useGetSessions.ts";
import GM_SP from '../../../../assests/GM_SP.png';
import PC_SP from '../../../../assests/PC_SP.png';
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography.tsx";
import SceneNavigator from "./SceneNavigator.tsx";

// --- Main Session Manager ---
export default function ActiveSessionView() {
    const {id} = useParams<{ id: string }>();
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [activeEncounter, setActiveEncounter] = useState<CampaignEncounter | null>(null);

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading: isCampaignLoading} = useCampaignLive(id);
    const {data: response, isLoading: isSessionsLoading} = useGetSessions(campaign?.id || '');
    // const {data: session, isLoading: isSessionLoading} = useGetCampaignSession(sessionId);

    const sampleSession = response[0];
    const [session, setSession] = useState<CampaignSession>(sampleSession);

    if (isCampaignLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    // const currentScene = sessionData.scenes[activeSceneIndex];
    const currentScene = sampleSession.scenes[activeSceneIndex];

    const launchEncounter = (encounter: CampaignEncounter) => {
        setActiveEncounter(encounter);
    };

    if (activeEncounter) {
        return (
            <EncounterManager
                encounter={activeEncounter}
                onEnd={() => setActiveEncounter(null)}
            />
        );
    }

    const flipStoryPoint = (side: 'PC' | 'GM') => {
        if (side === 'PC' && session.player > 0) {
            setSession({...session, player: session.player - 1, gm: session.gm + 1});
        } else if (side === 'GM' && session.gm > 0) {
            setSession({...session, gm: session.gm - 1, player: session.player + 1});
        }
    };

    return (
        <Box sx={{p: 3, height: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column'}}>

            {/* 1. SESSION HEADER */}
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box>
                    <Typography variant="h4" fontWeight="900" sx={{letterSpacing: -1}}>{sampleSession.id}</Typography>
                    <Typography variant="body2" color="text.secondary">January 6, 2026 | {campaign.name}</Typography>
                </Box>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="overline" sx={{opacity: 0.6}}>Story Points</Typography>
                        <Badge badgeContent={session.player} color="primary">
                            <IconButton onClick={() => flipStoryPoint('PC')} aria-label="custom action">
                                <img src={PC_SP} alt="Icon" style={{width: 32, height: 32}}/>
                            </IconButton>
                        </Badge>
                        <Badge badgeContent={session.gm} color="error">
                            <IconButton onClick={() => flipStoryPoint('GM')} aria-label="custom action">
                                <img src={GM_SP} alt="Icon" style={{width: 32, height: 32}}/>
                            </IconButton>
                        </Badge>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon/>}>Quick Note</Button>
                    <Button variant="contained" color="error" startIcon={<PlayArrowIcon/>}>End Session</Button>
                </Stack>
            </Box>

            <Grid container spacing={2} sx={{flexGrow: 1, minHeight: 0}}>

                {/* COLUMN 1: SCENE NAVIGATOR (Left) */}
                <Grid size={{xs: 12, md: 2}} sx={{height: '100%'}}>
                    <SceneNavigator scenes={sampleSession.scenes} activeSceneIndex={activeSceneIndex}
                                    setActiveSceneIndex={setActiveSceneIndex}/>
                </Grid>

                {/* COLUMN 2: THE STAGE (Center) */}
                <Grid size={{xs: 12, md: 7}} sx={{height: '100%'}}>
                    <Paper sx={{
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box sx={{position: 'relative', height: '40%'}}>
                            <CardMedia
                                component="img"
                                image={currentScene.mapUrl}
                                sx={{height: '100%', filter: 'brightness(0.5)'}}
                            />
                            <Box sx={{position: 'absolute', bottom: 20, left: 20}}>
                                <Chip label="ACTIVE STAGE" color="primary" size="small"
                                      sx={{mb: 1, fontWeight: 'bold'}}/>
                                <Typography variant="h3" fontWeight="900" color="white">{currentScene.name}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{p: 3, flexGrow: 1, overflowY: 'auto', bgcolor: 'background.paper'}}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Encounters</Typography>
                            <Grid container spacing={2}>
                                {currentScene.encounters.map((enc) => (
                                    <Grid size={{xs: 12, sm: 6}} key={enc.encounterId}>
                                        <Card variant="outlined" sx={{
                                            bgcolor: 'rgba(255,255,255,0.02)',
                                            borderColor: 'rgba(255,255,255,0.1)'
                                        }}>
                                            <CardContent>
                                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                                                    <Typography variant="subtitle1"
                                                                fontWeight="bold">{enc.name}</Typography>
                                                    {enc.encounterType === CampaignEncounterEncounterType.Combat ?
                                                        <GavelIcon color="error"/> :
                                                        <ForumIcon color="info"/>}
                                                </Box>
                                                <Stack direction="row" spacing={1} mb={2}>
                                                    <Chip label={enc.encounterType} size="small" variant="outlined"/>
                                                    <Chip label={enc.encounterStatus} size="small"
                                                        // color={enc.status === "READY" ? "success" : "default"}
                                                    />
                                                </Stack>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={enc.encounterStatus === CampaignEncounterEncounterStatus.Resolved}
                                                    startIcon={<PlayArrowIcon/>}
                                                    onClick={() => launchEncounter(enc)}
                                                >
                                                    {enc.encounterStatus === CampaignEncounterEncounterStatus.Resolved ? "Resolved" : "Launch Encounter"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* COLUMN 3: ACTIVE ROSTER (Right) */}
                <Grid size={{xs: 12, md: 3}} sx={{height: '100%'}}>
                    <Paper sx={{p: 2, height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="overline" fontWeight="700" color="primary">Active Roster</Typography>

                        <Box sx={{mt: 2, flexGrow: 1, overflowY: 'auto'}}>
                            <Typography variant="caption" fontWeight="bold" sx={{opacity: 0.5, letterSpacing: 1}}>THE
                                PARTY</Typography>
                            <List dense>
                                {sampleSession.party.players.map(pc => (
                                    // <RosterItem key={pc.id} name={pc.name} wounds={pc.derivedStats.woundThreshold}
                                    //                                     //             strain={pc.derivedStats.strainThreshold}/>
                                    <ListItem sx={{px: 0, mb: 0.5}}>
                                        <ListItemText
                                            primary={<Typography variant="body2"
                                                                 fontWeight="bold">{pc.name}</Typography>}
                                            secondary={
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="caption"
                                                                color="error.light">W: {pc.derivedStats.woundThreshold.total}</Typography>
                                                    <Typography variant="caption"
                                                                color="info.light">S: {pc.derivedStats.strainThreshold.total}</Typography>
                                                </Stack>
                                            }
                                        />
                                        <IconButton size="small"><MoreVertIcon fontSize="inherit"/></IconButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{my: 2, opacity: 0.1}}/>

                            {/*<Typography variant="caption" fontWeight="bold" sx={{opacity: 0.5, letterSpacing: 1}}>STORY*/}
                            {/*    NPCs</Typography>*/}
                            {/*<List dense>*/}
                            {/*    {sampleSession.storyNpcs.map(npc => (*/}
                            {/*        <RosterItem key={npc.id} name={npc.name} wounds={npc.wounds} strain={npc.strain}*/}
                            {/*                    isNpc/>*/}
                            {/*    ))}*/}
                            {/*</List>*/}
                        </Box>

                        <Box sx={{pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)'}}>
                            <Stack spacing={1}>
                                <Button fullWidth size="small" variant="outlined" startIcon={<AddIcon/>}>Add Story
                                    NPC</Button>
                                <Button fullWidth size="small" variant="text" startIcon={<LocalHospitalIcon/>}>Heal
                                    All</Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}