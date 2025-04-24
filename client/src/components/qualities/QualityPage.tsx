import {Card, CardContent} from '@mui/material';
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {RootPath} from "../../services/RootPath";
import {Fragment, useEffect, useState} from "react";
import Quality from "../../models/Quality";
import QualityModifierCard from "./modifiers/QualityModifierCard";
import QualityService from "../../services/QualityService";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import NumberTextFieldCard from "../common/card/NumberTextField";
import TextFieldCard from "../common/card/TextFieldCard";
import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard";
import GridContainer from "../common/grid/GridContainer";

const QualityPage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [quality, setQuality] = useState<Quality | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setQuality(await QualityService.getQuality(id))
        })()
    }, [id, setQuality])

    if (!quality) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (quality) {
            await updateQuality({...quality, description: event.target.value});
        }
    };

    const handleArmorQualityChange = async (value: boolean) => {
        if (quality) {
            await updateQuality({...quality, armor: value});
        }
    };

    const handleWeaponQualityChange = async (value: boolean) => {
        if (quality) {
            await updateQuality({...quality, weapon: value});
        }
    };

    const handleCostChange = async (value: number) => {
        if (quality) {
            await updateQuality({...quality, cost: value});
        }
    };

    const updateQuality = async (updatedQuality: Quality) => {
        if (updatedQuality) {
            setQuality(await QualityService.updateQuality(updatedQuality));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={quality.name} path={RootPath.Qualities + quality.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer centered>
                        <TextFieldCard title={"Description"} value={quality.description}
                                       disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <BooleanTextFieldCard title={"Armor Quality"} value={quality.armor}
                                              disabled={pathname.endsWith('/view')}
                                              onChange={handleArmorQualityChange}/>
                        <BooleanTextFieldCard title={"Weapon Quality"} value={quality.weapon}
                                              disabled={pathname.endsWith('/view')}
                                              onChange={handleWeaponQualityChange}/>
                        <NumberTextFieldCard title={"Advantage Cost"} value={quality.cost} onChange={handleCostChange}
                                             min={0} max={3} disabled={pathname.endsWith('/view')}/>
                    </GridContainer>
                    <QualityModifierCard quality={quality} updateQuality={updateQuality}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default QualityPage;