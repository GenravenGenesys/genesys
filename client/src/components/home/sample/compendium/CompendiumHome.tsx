import {Box, Typography, Grid, CircularProgress} from '@mui/material';
import {useParams} from "react-router-dom";
import SkillCompendiumCard from "./skill/SkillCompendiumCard.tsx";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import TalentCompendiumCard from "./talent/TalentCompendiumCard.tsx";
import AdversaryCompendiumCard from "./adversary/AdversaryCompendiumCard.tsx";
import ItemCompendiumCard from './equipment/ItemCompendiumCard.tsx';
import ArchetypeCompendiumCard from "./archetype/ArchetypeCompendiumCard.tsx";
import CareerCompendiumCard from "./career/CareerCompendiumCard.tsx";

export default function CompendiumHome() {
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

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
                <SkillCompendiumCard skills={campaign.compendium.skills} campaignId={id}/>
                <TalentCompendiumCard talents={campaign.compendium.talents} campaignId={id}/>
                <ItemCompendiumCard items={campaign.compendium.items} campaignId={id}/>
                <AdversaryCompendiumCard adversaries={campaign.compendium.adversaries} campaignId={id}/>
                <ArchetypeCompendiumCard archetypes={campaign.compendium.archetypes} campaignId={id}/>
                <CareerCompendiumCard careers={campaign.compendium.careers} campaignId={id}/>

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