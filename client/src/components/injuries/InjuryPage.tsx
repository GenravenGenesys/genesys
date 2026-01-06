import {Card, CardContent, CircularProgress, Divider} from "@mui/material";
import {useLocation, useParams} from "react-router";
import {RootPath} from "../../services/RootPath";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";
import {Fragment, useEffect, useState} from "react";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import DifficultyCard from "../common/card/select/DifficultyCard";
import NumberTextFieldCard from "../common/card/NumberTextFieldCard";
import TextFieldCard from "../common/card/TextFieldCard";
import GridContainer from "../common/grid/GridContainer";
import {getInjuryController} from "../../api/generated/injury-controller/injury-controller.ts";
import type {CriticalInjury, Difficulty} from "../../api/model";
import GenesysAlert from "../common/GenesysAlert.tsx";

const InjuryPage = () => {
    const {id} = useParams<{ id: string }>();
    const [injury, setInjury] = useState<CriticalInjury>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getInjuryController().getInjuryById(id);
                setInjury(response);
            } catch (err) {
                setError('Failed to load injury.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <GenesysAlert message={error}/>;
    }

    if (!injury || !id) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (value: string) => {
        if (injury) {
            await updateInjury({...injury, description: value});
        }
    };

    const handleSeverityChange = async (value: Difficulty) => {
        if (injury) {
            await updateInjury({...injury, severity: value});
        }
    };

    const handleMinChange = async (value: number) => {
        if (injury) {
            await updateInjury({...injury, min: value});
        }
    };

    const handleMaxChange = async (value: number) => {
        if (injury) {
            await updateInjury({...injury, max: value});
        }
    };

    const updateInjury = async (updatedInjury: CriticalInjury) => {
        setInjury(await getInjuryController().updateInjury(id, updatedInjury));
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
                    <CriticalInjuryModifierCard injury={injury} updateInjury={updateInjury}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default InjuryPage;