import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import ArchetypeIcon from '@mui/icons-material/PersonAdd';
import type {Archetype} from "../../../../../api/model";
import RouterLinkButton from "../../../common/RouterLink.tsx";
import {RootPath} from "../../../../../services/RootPath.ts";

interface Props {
    archetypes: Archetype[];
    campaignId: string;
}

export default function ArchetypeCompendiumCard(props: Props) {
    const {archetypes, campaignId} = props;
    const color = "#00e5ff";

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}} key={"Archetypes"}>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${color}`,
                transition: 'transform 0.2s',
                '&:hover': {transform: 'translateY(-4px)'}
            }}>
                <CardContent sx={{flexGrow: 1}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                        <Box sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: `${color}22`,
                            color: color,
                            display: 'flex'
                        }}>
                            <ArchetypeIcon/>
                        </Box>
                        <Chip label={`${archetypes.length} Items`} size="small"/>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Archetypes
                    </Typography>

                    <Divider sx={{my: 1.5, opacity: 0.1}}/>

                    <List dense>
                        {archetypes.map(item => (
                            <ListItem key={item.id} disablePadding sx={{py: 0.5}}>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>

                <Box sx={{p: 2, display: 'flex', gap: 1}}>
                    <RouterLinkButton to={RootPath.Campaign + campaignId + "/compendium" + RootPath.Archetype} text={"View All"}/>
                </Box>
            </Card>
        </Grid>
    );
}