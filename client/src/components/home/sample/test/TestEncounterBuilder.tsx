import {type CampaignEncounter, InitiativeSlotType} from "../../../../api/model";
import {
    Alert,
    Box,
    Grid,
    Paper, Tabs,
    Typography
} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import EncounterPartyTab from "./EncounterPartyTab.tsx";

interface Props {
    encounter: CampaignEncounter;
    numberOfParticipants: number;
    onRemovePartyMember: (id: string) => void;
    onRemovePartyNPC: (id: string) => void;
}

export default function TestEncounterBuilder(props: Props) {
    const {encounter, numberOfParticipants, onRemovePartyMember, onRemovePartyNPC} = props;
    const [tabValue, setTabValue] = useState(0);

    return (
        <Grid>
            <Paper>
                <Typography variant="h6" gutterBottom>
                    Participants ({numberOfParticipants})
                </Typography>

                {numberOfParticipants === 0 ? (
                    <Alert severity="info">
                        Add participants from the sections below
                    </Alert>
                ) : (
                    <Grid container spacing={2}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} color="primary" centered>
                                {Object.values(InitiativeSlotType).map((type) => (
                                    <Tab key={type} label={type}/>
                                ))}
                            </Tabs>
                        </Box>
                        {tabValue === 0 &&
                            <EncounterPartyTab party={encounter.party} onRemovePartyMember={onRemovePartyMember}
                                               onRemovePartyNPC={onRemovePartyNPC}/>}
                    </Grid>
                )}
            </Paper>
        </Grid>
    );
}