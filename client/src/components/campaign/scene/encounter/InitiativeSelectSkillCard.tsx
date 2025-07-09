import { Card, CardContent, Select, MenuItem, Typography } from "@mui/material";
import { ActorSkill, getActorCharacteristicRanks } from "../../../../models/actor/Actor"
import Character from "../../../../models/campaign/encounter/Character"
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";

type Props = {
    character: Character;
    onChange: (skill: ActorSkill) => void;
};

const InitiativeSelectSkillCard: React.FC<Props> = ({ character, onChange }) => {

    const onCommit = (name: string) => {
        let selectedSkill = character.skills.find((sk) => sk.name === name) as ActorSkill;
        onChange(selectedSkill);
    }

    return (
        <Card>
            <CenteredCardHeader title={character.name}/>
            <CardContent>
                <Select
                    onChange={(e) => onCommit(String(e.target.value))}
                    fullWidth
                    label={'Skill'}
                >
                    {character.skills.filter(skill => skill.initiative).map(skill => (
                        <MenuItem value={skill.name}>
                            <Typography>{skill.name}</Typography>
                            <GenesysSkillDiceTypography characteristicRanks={getActorCharacteristicRanks(character, skill)}
                                                        skillRanks={skill.ranks}/>
                        </MenuItem>
                    ))}
                </Select>
            </CardContent>
        </Card>
    );
};

export default InitiativeSelectSkillCard;