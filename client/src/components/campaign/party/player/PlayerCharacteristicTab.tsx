import ViewFieldCard from "../../../common/ViewFieldCard";
import ExperienceCard from "./experience/ExperienceCard";
import ArchetypeSelectCard from "./ArchetypeSelectCard";
import CareerSelectCard from "./CareerSkillCard";
import {type Archetype, type Player, type PlayerSkill} from "../../../../api/model";
import PlayerCharacteristicRow from "./PlayerCharacteristicRow";
import DerivedPlayerStatsRow from "./DerivedPlayerStatsRow";
import GridContainer from "../../../common/grid/GridContainer";
import type {Career} from "../../../../api/model";
import {getPlayerController} from "../../../../api/generated/player-controller/player-controller.ts";

interface Props {
    player: Player;
    updatePlayer: (player: Player) => void;
}

export default function PlayerCharacteristicTab(props: Props) {
    const {player, updatePlayer} = props;

    const handleArchetypeChange = async (value: Archetype) => {
        if (player) {
            updatePlayer(await getPlayerController().updatePlayerArchetype(player.id, value));
        }
    };

    const handleCareerChange = async (value: Career) => {
        if (player) {
            updatePlayer(await getPlayerController().updatePlayerCareer(player.id, value));
        }
    };

    const handleCareerSkillChange = async (value: PlayerSkill[]) => {
        if (player) {
            updatePlayer(await getPlayerController().updatePlayerCareerSkills(player.id, value));
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
            <PlayerCharacteristicRow player={player}/>
            <DerivedPlayerStatsRow player={player}/>
        </GridContainer>
    );
}