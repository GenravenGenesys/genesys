import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import EditSettingsCard from "../common/setting/EditSettingsCard";
import SettingService from "../../services/SettingService";
import Career from "../../models/actor/player/Career";
import CareerService from '../../services/CareerService';
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import EditSkillsCard from "./EditSkillsCard";

interface Props {
    car: Career
}

export default function CareerEdit(props: Props) {
    const {car} = props
    const [career, setCareer] = useState<Career>(car)
    let navigate = useNavigate()

    useEffect(() => {
        setCareer(car)
    }, [car])

    const onSettingAddition = async (name: string) => {
        const copyCareer = {...career} as Career
        let setting = await SettingService.getSetting(name)
        copyCareer.settings = copyCareer.settings.concat(setting)
        await updateCareer(copyCareer)
    }

    const onSettingRemoval = async (name: string) => {
        const copyCareer = {...career} as Career
        copyCareer.settings.forEach((set, index) => {
            if (set.name === name) {
                copyCareer.settings.splice(index, 1)
            }
        })
        await updateCareer(copyCareer)
    }

    const updateCareer = async (copyCareer: Career) => {
        setCareer(copyCareer)
        await CareerService.updateCareer(career.name, copyCareer)
    }

    const onView = () => {
        navigate(Path.Career + career.name + '/view');
    }

    return (
        <Card>
            <CardHeader title={career.name} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <EditSkillsCard car={career}/>
                    <EditSettingsCard settings={career.settings} onSettingAddition={onSettingAddition}
                                      onSettingRemoval={onSettingRemoval} allSettings={useFetchAllSettings()}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
