import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {SkillType} from "../../../../models/actor/Skill";
import CenteredCardHeader from "../header/CenteredCardHeader";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../field/GenesysSelectField";

type Props = {
    value: SkillType;
    onChange: (value: SkillType) => void;
    disabled: boolean;
};

const SkillTypeCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Skill Type'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Skill Type'} onChange={onChange} options={SkillType}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default SkillTypeCard;