import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import ViewFieldCard from "../../../common/ViewFieldCard";
import ExperienceCard from "./experience/ExperienceCard";
import * as React from "react";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import CareerSelectCard from "./CareerSkillCard";
import Archetype from "../../../../models/actor/player/Archetype";
import PlayerService from "../../../../services/actor/PlayerService";
import Career from "../../../../models/actor/player/Career";
import CharacteristicRow from "../../actor/common/PlayerCharacteristicRow";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import GridContainer from "../../../common/grid/GridContainer";

interface Props {
    player: Player;
    updatePlayer: (player: Player) => void;
}

export default function PlayerCharacteristicTab(props: Props) {
    const {player, updatePlayer} = props;

    const handleArchetypeChange = async (value: Archetype) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerArchetype(player.id, value));
        }
    };

    const handleCareerChange = async (value: Career) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerCareer(player.id, value));
        }
    };

    const handleCareerSkillChange = async (value: PlayerSkill[]) => {
        if (player) {
            updatePlayer(await PlayerService.updatePlayerCareerSkills(player.id, value));
        }
    };

    return (
        <GridContainer centered>
            <GridContainer spacing={2}>
                <ArchetypeSelectCard archetype={player.archetype} onCommit={handleArchetypeChange}/>
                <CareerSelectCard player={player} onCommit={handleCareerChange} onSkillSelect={handleCareerSkillChange}/>
                <ViewFieldCard name={'Encumbrance'} value={String(player.encumbrance)}/>
                <ExperienceCard player={player}/>
            </GridContainer>
            <CharacteristicRow actor={player}/>
            <DerivedPlayerStatsRow player={player}/>
        </GridContainer>
    );
}