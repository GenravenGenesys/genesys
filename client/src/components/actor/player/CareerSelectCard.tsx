import {Fragment, useEffect, useState} from "react";
import {
    Card,
    CardContent,
    Grid,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import CareerService from "../../../services/CareerService";
import Career from "../../../models/actor/player/Career";
import * as React from "react";
import CareerSkillSelectDialog from "./CareerSkillSelectDialog";
import Player from "../../../models/actor/player/Player";
import {useFetchCurrentSetting} from "../../setting/SettingWorkflow";

interface AllProps {
    player: Player
}

export default function CareerSelectCard(props: AllProps): JSX.Element {
    const {player} = props
    const setting = useFetchCurrentSetting()
    const [careers, setCareers] = useState<Career[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async (): Promise<void> => {
            const careerList = await CareerService.getCareers()
            if (!careerList) {
                return
            }
            let temp = [] as Career[]
            careerList.forEach((career, index) => {
                if (career.settings.some(set => set.name === setting?.name!!)) {
                    temp.push(career)
                }
            })
            setCareers(temp)
        })()
    }, [setting])

    const onClick = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Career'}/>
                <CardContent>
                    <List>
                        {careers.map((career: Career) => (
                            <Fragment>
                                <ListItemButton divider onClick={onClick}>
                                    <ListItemText primary={career.name}/>
                                </ListItemButton>
                                <CareerSkillSelectDialog open={open} onClose={onClose} player={player}/>
                            </Fragment>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )
}