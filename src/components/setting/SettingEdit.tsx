import {Card, CardContent, CardHeader, Checkbox, Divider, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import Setting from '../../models/Setting';
import SettingService from '../../services/SettingService';
import {useNavigate} from 'react-router-dom';
import {RootPath} from "../../services/RootPath";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";

interface Props {
    set: Setting
}

export default function SettingEdit(props: Props) {
    const {set} = props
    const [setting, setSetting] = useState<Setting>(set)

    let navigate = useNavigate()

    useEffect(() => {setSetting(set)}, [set])

    const onChange = async (key: keyof Setting, value: any) => {
        if (value === null || (setting !== null && setting[key] === value)) {
            return
        }
        const copySetting = { ...setting } as Setting
        switch (key) {
            case "magic":
                copySetting.magic = !setting?.magic!!
                break
        }
        setSetting(copySetting)

        await SettingService.updateSetting(copySetting.name, copySetting)
    }

    const onView = () => {
        navigate(RootPath.Setting + setting.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={setting?.name!!} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <CardHeader title={'Magic'} style={{ textAlign: 'center' }} />
                            <Divider />
                            <Checkbox onChange={(): void => {onChange('magic', !setting?.magic!!)}} checked={setting?.magic!!}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
