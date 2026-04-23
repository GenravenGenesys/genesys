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
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import type {Spell} from "../../../../../api/model";
import RouterLinkButton from "../../../common/RouterLink.tsx";
import {RootPath} from "../../../../../services/RootPath.ts";

interface Props {
    spells: Spell[];
    campaignId: string;
}

export default function SpellCompendiumCard(props: Props) {
    const {spells, campaignId} = props;
    const color = "#ce93d8";

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}} key={"Spells"}>
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
                            <AutoFixHighIcon/>
                        </Box>
                        <Chip label={`${spells.length} Items`} size="small"/>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Spells
                    </Typography>

                    <Divider sx={{my: 1.5, opacity: 0.1}}/>

                    <List dense>
                        {spells.map(item => (
                            <ListItem key={item.id} disablePadding sx={{py: 0.5}}>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>

                <Box sx={{p: 2, display: 'flex', gap: 1}}>
                    <RouterLinkButton to={RootPath.Campaign + campaignId + "/compendium" + RootPath.Spell} text={"View All"}/>
                </Box>
            </Card>
        </Grid>
    );
}
