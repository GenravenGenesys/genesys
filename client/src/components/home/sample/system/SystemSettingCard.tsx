import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import TalentIcon from "@mui/icons-material/AutoStories";
import RouterLinkButton from "../../../common/RouterLink.tsx";
import {RootPath} from "../../../../services/RootPath.ts";
import {useFetchAllInjuries} from "../../../../hooks/injuries/useFetchAllInjuries.ts";

export default function SystemSettingCard() {
    const {injuries, loading, error} = useFetchAllInjuries();
    const color = "#00e5ff";

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}} key={"Talents"}>
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
                            <TalentIcon/>
                        </Box>
                        <Chip label={`${injuries.length} Items`} size="small"/>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Talents
                    </Typography>

                    <Divider sx={{my: 1.5, opacity: 0.1}}/>

                    <List dense>
                        {injuries.map(item => (
                            <ListItem key={item.id} disablePadding sx={{py: 0.5}}>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>

                <Box sx={{p: 2, display: 'flex', gap: 1}}>
                    <RouterLinkButton to={RootPath.Injury}
                                      text={"View All"}/>
                </Box>
            </Card>
        </Grid>
    );
}