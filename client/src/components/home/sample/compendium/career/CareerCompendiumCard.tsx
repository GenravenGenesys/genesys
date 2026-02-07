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
import WorkIcon from '@mui/icons-material/Work';
import type {Career} from "../../../../../api/model";
import RouterLinkButton from "../../../../common/RouterLink.tsx";
import {RootPath} from "../../../../../app/RootPath.ts";

interface Props {
    careers: Career[];
    campaignId: string;
}

export default function CareerCompendiumCard(props: Props) {
    const {careers, campaignId} = props;
    const color = "#00e5ff";

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}} key={"Careers"}>
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
                            <WorkIcon/>
                        </Box>
                        <Chip label={`${careers.length} Items`} size="small"/>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Careers
                    </Typography>

                    <Divider sx={{my: 1.5, opacity: 0.1}}/>

                    <List dense>
                        {careers.map(item => (
                            <ListItem key={item.id} disablePadding sx={{py: 0.5}}>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>

                <Box sx={{p: 2, display: 'flex', gap: 1}}>
                    <RouterLinkButton to={RootPath.Campaign + campaignId + "/compendium" + RootPath.Career} text={"View All"}/>
                </Box>
            </Card>
        </Grid>
    );
}