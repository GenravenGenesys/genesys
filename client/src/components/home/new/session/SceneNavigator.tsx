import {Box, Button, List, ListItem, Paper, Typography} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography.tsx";
import AddIcon from "@mui/icons-material/Add";
import {type CampaignEncounter, CampaignEncounterType, type CampaignScene} from "../../../../api/model";

interface Props {
    scenes: CampaignScene[],
    activeSceneIndex: number;
    setActiveSceneIndex: (index: number) => void;
}

export default function SceneNavigator(props: Props) {
    const {scenes, activeSceneIndex, setActiveSceneIndex} = props;

    const generateCombatEncounterText = (encounters: CampaignEncounter[]) => {
        return encounters.filter((e) => e.type === CampaignEncounterType.Combat).length + " [combat] Encounters";
    };

    const generateSocialEncounterText = (encounters: CampaignEncounter[]) => {
        return encounters.filter((e) => e.type === CampaignEncounterType.Social).length + " [social] Encounters";
    };

    return (
        <Paper sx={{p: 2, height: '100%', borderRadius: 3, overflowY: 'auto'}}>
            <Typography variant="overline" fontWeight="700" color="primary">Prepared Scenes</Typography>
            <List sx={{mt: 1}}>
                {scenes.map((scene, index) => (
                    <ListItem
                        key={scene.sceneId}
                        disablePadding
                        sx={{mb: 1}}
                    >
                        <Button
                            fullWidth
                            onClick={() => setActiveSceneIndex(index)}
                            variant={activeSceneIndex === index ? "contained" : "text"}
                            sx={{
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                py: 1.5,
                                borderRadius: 2,
                                bgcolor: activeSceneIndex === index ? 'primary.main' : 'transparent',
                                color: activeSceneIndex === index ? 'black' : 'white'
                            }}
                            startIcon={<MapIcon/>}
                        >
                            <Box>
                                <Typography variant="body2" fontWeight="bold">{scene.name}</Typography>
                                <GenesysDescriptionTypography variant="caption"
                                                              sx={{opacity: 0.7}}
                                                              text={generateCombatEncounterText(scene.encounters)}/>
                                <GenesysDescriptionTypography variant="caption"
                                                              sx={{opacity: 0.7}}
                                                              text={generateSocialEncounterText(scene.encounters)}/>
                            </Box>
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Button fullWidth variant="outlined" startIcon={<AddIcon/>} sx={{mt: 2, borderStyle: 'dashed'}}>
                Add Scene
            </Button>
        </Paper>
    );
}