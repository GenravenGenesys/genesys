import {useParams} from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";
import StarIcon from "@mui/icons-material/Star";
import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton.tsx";
import {useState} from "react";
import PlayerCreationDialog from "./PlayerCreationDialog.tsx";
import type {PlayerCharacter} from "../../../../api/model";
import {emptyPlayerCharacter} from "../../../../models/Template.ts";

export default function PartyPage() {
    const {id} = useParams<{ id: string }>();
    const [player, setPlayer] = useState<PlayerCharacter>(emptyPlayerCharacter);
    const [openDialog, setOpenDialog] = useState(false);

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

    const party = campaign.party;

    const handleSave = async (updatedPlayer: PlayerCharacter) => {
        console.log("Saving player:", updatedPlayer);
        // await createArchetypeMutation.mutateAsync({
        //     campaignId: campaign.id,
        //     data: updatedArchetype
        // });

        setPlayer(emptyPlayerCharacter);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                {"Party"}
            </Typography>

            <Grid container spacing={3}>
                {/* Party Status Card */}
                <Grid size={{xs: 12}}>
                    <Card>
                        <CenteredCardHeaderWithButton title={"Party Status"} onClick={() => setOpenDialog(true)}
                                                      buttonText={"Create Player"}/>
                        <CardHeader title="Party Status"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 4}}>
                                    <Typography variant="caption">Status</Typography>
                                    {/*<Typography variant="h6">{party.party.status}</Typography>*/}
                                </Grid>
                                <Grid size={{xs: 4}}>
                                    <Typography variant="caption">Party Size</Typography>
                                    <Typography variant="h6">{party.players.length}</Typography>
                                </Grid>
                                <Grid size={{xs: 4}}>
                                    <Typography variant="caption">Funds</Typography>
                                    {/*<Typography variant="h6">{party.party.funds} credits</Typography>*/}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <PlayerCreationDialog open={Boolean(openDialog)} onClose={() => setOpenDialog(false)}
                                              player={player} onSave={handleSave} compendium={campaign.compendium}/>
                    </Card>
                </Grid>

                {/* Character Cards */}
                {party.players.map((character) => (
                    <Grid size={{xs: 12, md: 6, lg: 4}} key={character.id}>
                        <Card>
                            <CardHeader
                                title={character.name}
                                subheader={`${character.archetype.name} ${character.career.name}`}
                                // action={
                                //     character.id === party.myCharacterId && (
                                //         <Chip label="You" color="primary" size="small"/>
                                //     )
                                // }
                            />
                            <CardContent>
                                <Box sx={{mb: 2}}>
                                    <Typography variant="caption">Wounds</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(character.derivedStats.woundThreshold.current / character.derivedStats.woundThreshold.total) * 100}
                                        color={character.derivedStats.woundThreshold.current > character.derivedStats.woundThreshold.total * 0.75 ? 'error' : 'success'}
                                    />
                                    <Typography variant="caption">
                                        {character.derivedStats.woundThreshold.current} / {character.derivedStats.woundThreshold.total}
                                    </Typography>
                                </Box>

                                <Box sx={{mb: 2}}>
                                    <Typography variant="caption">Strain</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(character.derivedStats.strainThreshold.current / character.derivedStats.strainThreshold.total) * 100}
                                        color={character.derivedStats.strainThreshold.current > character.derivedStats.strainThreshold.total * 0.75 ? 'warning' : 'primary'}
                                    />
                                    <Typography variant="caption">
                                        {character.derivedStats.strainThreshold.current} / {character.derivedStats.strainThreshold.total}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Chip
                                        // label={`${character.availableExperience} XP Available`}
                                        icon={<StarIcon/>}
                                        size="small"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}