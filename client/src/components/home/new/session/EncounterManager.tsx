import React, {Fragment, useState} from 'react';
import {
    Box, Typography, Paper, Button,
    Container
} from '@mui/material';

import {type CampaignEncounter, CampaignEncounterStatus, type InitiativeSlot} from "../../../../api/model";
import StopIcon from '@mui/icons-material/Stop';
import StartEncounterView from "./encounter/StartEncounterView.tsx";

interface Props {
    encounter: CampaignEncounter,
    onEnd: () => void
}

export default function EncounterManager(props: Props) {
    const {encounter, onEnd} = props;
    const [round, setRound] = useState(1);
    const [initiativeOrder, setInitiativeOrder] = useState<InitiativeSlot[]>(
        encounter.initiativeOrder ?? []
    );

    const handleAddInitiativeSlot = (slot: InitiativeSlot) => {
        setInitiativeOrder((prev) => {
            // Replace existing slot for the same participant if re-rolling
            const filtered = prev.filter((s) => s.rolledBy !== slot.rolledBy);
            return [...filtered, slot];
        });
    };

    const handleRemoveInitiativeSlot = (index: number) => {
        setInitiativeOrder((prev) => {
            const sorted = [...prev].sort(compareSlots);
            const slotToRemove = sorted[index];
            return prev.filter((s) => s !== slotToRemove);
        });
    };

    const handleStartEncounter = () => {
        // TODO: persist initiativeOrder and transition encounter to Active status
        setRound(1);
    };

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom align="center" sx={{mb: 2}}>
                    {encounter.name}
                </Typography>
                <Button variant="contained" color="error" startIcon={<StopIcon/>} onClick={() => onEnd()}>End
                    Encounter</Button>
            </Box>


            {encounter.status === CampaignEncounterStatus.Building && (
                <Fragment/>
            )}

            {encounter.status === CampaignEncounterStatus.Ready && (
                <StartEncounterView
                    encounter={encounter}
                    initiativeOrder={initiativeOrder}
                    onAddInitiativeSlot={handleAddInitiativeSlot}
                    onRemoveInitiativeSlot={handleRemoveInitiativeSlot}
                    onStartEncounter={handleStartEncounter}
                />
            )}

            {encounter.status === CampaignEncounterStatus.Active && (
                <Fragment/>
            )}

            {encounter.status === CampaignEncounterStatus.Resolved && (
                <Paper sx={{p: 4, textAlign: "center"}}>
                    <Typography variant="h4" gutterBottom>
                        Encounter Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                        {encounter.name} has ended after {round} rounds.
                    </Typography>
                </Paper>
            )}

        </Container>
    );
}

function compareSlots(a: InitiativeSlot, b: InitiativeSlot): number {
    const aSuccess = (a.results?.success ?? 0) + (a.results?.triumph ?? 0)
        - (a.results?.failure ?? 0) - (a.results?.despair ?? 0);
    const bSuccess = (b.results?.success ?? 0) + (b.results?.triumph ?? 0)
        - (b.results?.failure ?? 0) - (b.results?.despair ?? 0);
    if (bSuccess !== aSuccess) return bSuccess - aSuccess;
    const aAdv = (a.results?.advantage ?? 0) - (a.results?.threat ?? 0);
    const bAdv = (b.results?.advantage ?? 0) - (b.results?.threat ?? 0);
    return bAdv - aAdv;
}