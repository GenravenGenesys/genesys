import {useState} from "react";
import type {PlayerCharacter} from "../../../../api/model";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader.tsx";
import {Box, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {SkillXpSpender} from "./SkillXpSpender.tsx";
import {useParams} from "react-router-dom";
import {useCampaignLive} from "../../../../hooks/campaign/useCampaginLive.ts";

interface Props {
    player: PlayerCharacter;
    onCharacteristicSpend: (experience: number) => void;
    skillRanks: Record<string, number>;
}

export default function PurchaseSkillRanksTab(props: Props) {
    const {player, onCharacteristicSpend} = props;
    const {id} = useParams<{ id: string }>();
    const [skillRanks, setSkillRanks] = useState<Record<string, number>>({});

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

    const handleRankChange = (skillId: string, newRank: number) => {
        setSkillRanks((prev) => ({
            ...prev,
            [skillId]: newRank,
        }));
    };

    return (
        <Card>
            <CenteredCardHeader title={'Increase Skill Ranks'}/>
            <CardContent>
                <SkillXpSpender skills={campaign.compendium.skills} skillRanks={skillRanks}
                                onRankChange={handleRankChange} availableXp={player.experience.initial}
                                characteristics={{
                                    brawn: player.characteristics.brawn.base,
                                    agility: player.characteristics.agility.base,
                                    intellect: player.characteristics.intellect.base,
                                    cunning: player.characteristics.cunning.base,
                                    willpower: player.characteristics.willpower.base,
                                    presence: player.characteristics.presence.base
                                }}/>
            </CardContent>
        </Card>
    );
}