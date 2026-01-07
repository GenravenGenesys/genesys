import {
    Box, Typography, Grid2 as Grid, Card, CardContent,
    Button, Divider, List, ListItem, ListItemText,
    IconButton, Chip, Paper, CircularProgress
} from '@mui/material';

// Standard MUI Icons
import SwordIcon from '@mui/icons-material/SportsMma';
import TalentIcon from '@mui/icons-material/AutoStories';
import ArchetypeIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GroupsIcon from '@mui/icons-material/Groups';
import {useParams} from "react-router-dom";
import SkillCompendiumCard from "./SkillCompendiumCard.tsx";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";

export default function CompendiumHome() {
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {data: campaign, isLoading} = useCampaignLive(id);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    // Mock Data: In 2026, these would be fetched via your Spring Boot Reactive API
    // const compendiumCategories = [
    //     {
    //         title: "Talents",
    //         count: 24,
    //         icon: <TalentIcon/>,
    //         color: "#ff4081",
    //         preview: ["Hard Headed", "Quick Strike", "Side Step"]
    //     },
    //     {
    //         title: "Weapons & Gear",
    //         count: 42,
    //         icon: <SwordIcon/>,
    //         color: "#ff9100",
    //         preview: ["Heavy Blaster", "Monofilament Blade"]
    //     },
    //     {
    //         title: "Adversaries",
    //         count: 12,
    //         icon: <GroupsIcon/>,
    //         color: "#f44336", // Nemesis Red
    //         preview: ["Stormtrooper (Minion)", "Local Thug (Rival)", "Sith Inquisitor (Nemesis)"]
    //     },
    //     {
    //         title: "Archetypes",
    //         count: 5,
    //         icon: <ArchetypeIcon/>,
    //         color: "#a255ff",
    //         preview: ["Human", "Android", "N'hali"]
    //     },
    // ];

    return (
        <Box sx={{p: 4, maxWidth: 1400, mx: 'auto'}}>
            {/* Header Section */}
            <Box sx={{mb: 6, display: 'flex', alignItems: 'flex-end', gap: 2}}>
                <Typography variant="h3" fontWeight="900" sx={{lineHeight: 1}}>
                    Compendium
                </Typography>
                <Typography variant="h6" color="primary.main" sx={{mb: 0.5}}>
                    / {campaign.name}
                </Typography>
            </Box>

            {/* Bento Grid Layout */}
            <Grid container spacing={3}>

                {/* Main Category Cards */}
                {/*{compendiumCategories.map((cat) => (*/}
                {/*    <Grid size={{xs: 12, md: 6, lg: 3}} key={cat.title}>*/}
                {/*        <Card sx={{*/}
                {/*            height: '100%',*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            borderTop: `4px solid ${cat.color}`,*/}
                {/*            transition: 'transform 0.2s',*/}
                {/*            '&:hover': {transform: 'translateY(-4px)'}*/}
                {/*        }}>*/}
                {/*            <CardContent sx={{flexGrow: 1}}>*/}
                {/*                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>*/}
                {/*                    <Box sx={{*/}
                {/*                        p: 1,*/}
                {/*                        borderRadius: 2,*/}
                {/*                        bgcolor: `${cat.color}22`,*/}
                {/*                        color: cat.color,*/}
                {/*                        display: 'flex'*/}
                {/*                    }}>*/}
                {/*                        {cat.icon}*/}
                {/*                    </Box>*/}
                {/*                    <Chip label={`${cat.count} Items`} size="small"/>*/}
                {/*                </Box>*/}

                {/*                <Typography variant="h5" fontWeight="bold" gutterBottom>*/}
                {/*                    {cat.title}*/}
                {/*                </Typography>*/}

                {/*                <Divider sx={{my: 1.5, opacity: 0.1}}/>*/}

                {/*                <List dense>*/}
                {/*                    {cat.preview.map(item => (*/}
                {/*                        <ListItem key={item} disablePadding sx={{py: 0.5}}>*/}
                {/*                            <ListItemText*/}
                {/*                                primary={item}*/}
                {/*                            />*/}
                {/*                        </ListItem>*/}
                {/*                    ))}*/}
                {/*                </List>*/}
                {/*            </CardContent>*/}

                {/*            <Box sx={{p: 2, display: 'flex', gap: 1}}>*/}
                {/*                <Button fullWidth variant="outlined" size="small" startIcon={<OpenInNewIcon/>}>*/}
                {/*                    View All*/}
                {/*                </Button>*/}
                {/*                <IconButton color="primary" size="small" sx={{border: '1px solid'}}>*/}
                {/*                    <AddIcon/>*/}
                {/*                </IconButton>*/}
                {/*            </Box>*/}
                {/*        </Card>*/}
                {/*    </Grid>*/}
                {/*))}*/}
                <SkillCompendiumCard skills={campaign.compendium.skills} campaignId={id}/>

                {/* Setting Rules & Formatting Section */}
                {/*<Grid size={{ xs: 12, md: 8 }}>*/}
                {/*    <Paper sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4 }}>*/}
                {/*        <Typography variant="h6" fontWeight="bold" gutterBottom>*/}
                {/*            Campaign Settings & Rules*/}
                {/*        </Typography>*/}
                {/*        <Typography variant="body2" color="text.secondary" paragraph>*/}
                {/*            The following custom rules and characteristics are defined for this setting.*/}
                {/*            Changes here will affect all characters linked to this campaign.*/}
                {/*        </Typography>*/}

                {/*        <Grid container spacing={2} sx={{ mt: 2 }}>*/}
                {/*            {["Custom Magic System", "Vehicle Combat Mods", "Radiation Rules"].map(rule => (*/}
                {/*                <Grid size={{ xs: 12, sm: 4 }} key={rule}>*/}
                {/*                    <Button fullWidth variant="text" sx={{ justifyContent: 'flex-start', bgcolor: 'rgba(255,255,255,0.03)' }}>*/}
                {/*                        {rule}*/}
                {/*                    </Button>*/}
                {/*                </Grid>*/}
                {/*            ))}*/}
                {/*        </Grid>*/}
                {/*    </Paper>*/}
                {/*</Grid></>*/}

                {/*<Grid size={{ xs: 12, md: 4 }}>*/}
                {/*    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>*/}
                {/*        <CardContent>*/}
                {/*            <Typography variant="h6" fontWeight="bold">Quick Librarian</Typography>*/}
                {/*            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>*/}
                {/*                Import items from your Global Vault into this campaign.*/}
                {/*            </Typography>*/}
                {/*            <Button*/}
                {/*                variant="contained"*/}
                {/*                fullWidth*/}
                {/*                sx={{ bgcolor: 'background.default', color: 'primary.main', fontWeight: 'bold' }}*/}
                {/*            >*/}
                {/*                Import from Vault*/}
                {/*            </Button>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</Grid>*/}

            </Grid>
        </Box>
    );
}