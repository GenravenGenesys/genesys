import {type CampaignEncounter, InitiativeSlotType} from "../../../../api/model";
import {
    Alert,
    Box, Button,
    Paper, Tabs,
    Typography
} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import EncounterPartyTab from "./EncounterPartyTab.tsx";
import EncounterNPCTab from "./EncounterNPCTab.tsx";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
    onRemovePartyMember: (id: string) => void;
    onRemovePartyNPC: (id: string) => void;
    onRemoveNPC: (id: string) => void;
    onReadyEncounter: () => void;
}

export default function TestEncounterBuilder(props: Props) {
    const {encounter, numberOfParticipants, onRemovePartyMember, onRemovePartyNPC, onRemoveNPC, onReadyEncounter} = props;
    const [tabValue, setTabValue] = useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Participants ({numberOfParticipants})
                </Typography>

                {numberOfParticipants === 0 ? (
                    <Alert severity="info">
                        Add participants from the sections below
                    </Alert>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}>
                            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                                {Object.values(InitiativeSlotType).map((type) => (
                                    <Tab key={type} label={type}/>
                                ))}
                            </Tabs>
                        </Box>
                        {tabValue === 0 &&
                            <EncounterPartyTab party={encounter.party} onRemovePartyMember={onRemovePartyMember}
                                               onRemovePartyNPC={onRemovePartyNPC}/>}
                        {tabValue === 1 &&
                            <EncounterNPCTab adversaries={encounter.npcIds} onRemoveNPC={onRemoveNPC}/>}
                    </Box>
                )}
                <Button
                    variant="contained"
                    size="large"
                    onClick={onReadyEncounter}
                    disabled={numberOfParticipants === 0}
                >
                    Start Encounter
                </Button>
            </Paper>
        </Box>
    );
}