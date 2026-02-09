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
            </Grid>
        </Box>
    );
}