import Injury from "../../models/Injury";
import {Card, CardContent, Divider} from "@mui/material";
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootPath} from "../../services/RootPath";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";
import {Fragment, useEffect, useState} from "react";
import InjuryService from "../../services/InjuryService";
import {Difficulty} from "../../models/common/Difficulty";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import DifficultyCard from "../common/card/select/DifficultyCard";
import NumberTextFieldCard from "../common/card/NumberTextField";
import TextFieldCard from "../common/card/TextFieldCard";
import GridContainer from "../common/grid/GridContainer";

const InjuryPage = () => {
    const {id} = useParams<{ id: string }>();
    const [injury, setInjury] = useState<Injury | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setInjury(await InjuryService.getInjury(id));
        })()
    }, [id, setInjury])

    if (!injury) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, description: event.target.value}));
        }
    };

    const handleSeverityChange = async (value: Difficulty) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, severity: value}));
        }
    };

    const handleMinChange = async (value: number) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, min: value}));
        }
    };

    const handleMaxChange = async (value: number) => {
        if (injury) {
            setInjury(await InjuryService.updateInjury({...injury, max: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={injury.name} path={RootPath.Injury + injury.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer spacing={2}>
                        <DifficultyCard value={injury.severity} onChange={handleSeverityChange}
                                        disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Min"} value={injury.min} onChange={handleMinChange} min={0}
                                             max={150} disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={"Max"} value={injury.max} onChange={handleMaxChange} min={0}
                                             max={150} disabled={pathname.endsWith('/view')}/>
                    </GridContainer>
                    <Divider/>
                    <GridContainer spacing={2}>
                        <TextFieldCard title={"Description"} value={injury.description}
                                       disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                    </GridContainer>
                    <CriticalInjuryModifierCard crit={injury}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default InjuryPage;