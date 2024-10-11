import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import Talent, {Activation, Tier} from "../../models/Talent";
import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment, useEffect, useState} from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";
import CheckIcon from "@mui/icons-material/Check";
import TalentService from "../../services/TalentService";
import {ActivationCard, BooleanTextFieldCard, TextFieldCard, TierCard, ViewFieldCard} from "../common/ViewFieldCard";

export default function TalentPage() {
    const {id} = useParams<{ id: string }>();
    const [talent, setTalent] = useState<Talent | null>(null);
    let pathname = useLocation().pathname;
    let navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id));
        })()
    }, [id, setTalent]);

    if (!talent) {
        return <Fragment/>;
    }

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(RootPath.Talent + id + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(RootPath.Talent + id + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            )
        }
    }

    const handleRankedChange = async (value: boolean) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, ranked: value}));
        }
    };

    const handleActivationChange = async (value: Activation) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, activation: value}));
        }
    };

    const handleTierChange = async (value: Tier) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, tier: value}));
        }
    };

    const handleSummaryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, summary: event.target.value}));
        }
    };

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (talent) {
            setTalent(await TalentService.updateTalent({...talent, description: event.target.value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={talent.description}/> :
            <TextFieldCard title={"Description"} value={talent.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    const renderSummaryCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Summary"} value={talent.summary}/> :
            <TextFieldCard title={"Summary"} value={talent.summary}
                           disabled={pathname.endsWith('/view')} onChange={handleSummaryChange}/>;
    };

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={talent.name} action={onPageChange()}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <BooleanTextFieldCard title={'Ranked Talent'} value={talent.ranked}
                                              onChange={handleRankedChange} disabled={pathname.endsWith('/view')}/>
                        <ActivationCard value={talent.activation} onChange={handleActivationChange}
                                        disabled={pathname.endsWith('/view')}/>
                        <TierCard value={talent.tier} onChange={handleTierChange}
                                  disabled={pathname.endsWith('/view')}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    {renderSummaryCard()}
                </Grid>
                <Grid container justifyContent={'center'}>
                    {renderDescriptionCard()}
                </Grid>
                <TalentModifierCard tal={talent}/>
            </CardContent>
        </Card>
    )
}
