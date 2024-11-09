import {Card, CardContent, Grid,} from '@mui/material';
import {useLocation, useParams} from 'react-router-dom';
import * as React from 'react';
import {Armor} from "../../../../models/equipment/Armor";
import {Fragment, useEffect, useState} from "react";
import EquipmentService from "../../../../services/EquipmentService";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {TextFieldCard} from "../../../common/card/TextFieldCard";
import CenteredCardHeaderWithAction from "../../../common/card/CenteredCardHeaderWithAction";
import {EquipmentPath} from "../../../../services/RootPath";
import SoakCard from "../../../common/card/SoakCard";
import DefenseCard from "../../../common/card/DefenseCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {BooleanTextFieldCard} from "../../../common/card/BooleanTextFieldCard";
import PriceTextFieldCard from "../../../common/card/PriceTextFieldCard";
import ArmorQualityCard from "./quality/ArmorQualityCard";
import ArmorModifierCard from "./modifier/ArmorModifierCard";


export default function ArmorPage() {
    const {id} = useParams<{ id: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArmor(await EquipmentService.getArmor(id));
        })()
    }, [id, setArmor])

    if (!armor) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, description: event.target.value}));
        }
    };

    const handleSoakChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, soak: value}));
        }
    };

    const handleDefenseChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, defense: value}));
        }
    };

    const handleEncumbranceChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, encumbrance: value}));
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, restricted: value}));
        }
    };

    const handlePriceChange = async (value: number) => {
        if (armor) {
            setArmor(await EquipmentService.updateArmor({...armor, price: value}));
        }
    };

    const handleRarityChange = async (value: number) => {
        if (armor) {
            await updateArmor({...armor, rarity: value})
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={armor.description}/> :
            <TextFieldCard title={"Description"} value={armor.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    const updateArmor = async (updatedArmor: Armor) => {
        setArmor(await EquipmentService.updateArmor(updatedArmor));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={armor.name} path={EquipmentPath.Armor + armor.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderDescriptionCard()}
                </Grid>
                <Grid container justifyContent={'center'}>
                    <SoakCard armor={armor} updateSoak={handleSoakChange}/>
                    <DefenseCard armor={armor} updateDefense={handleDefenseChange}/>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <NumberTextFieldCard title={'Encumbrance'} value={armor.encumbrance}
                                         onChange={handleEncumbranceChange} min={1}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                    <BooleanTextFieldCard title={'Restricted'} value={armor.restricted}
                                          disabled={pathname.endsWith('/view')} onChange={handleRestrictedChange}/>
                    <PriceTextFieldCard price={armor.price} restricted={armor.restricted}
                                        onChange={handlePriceChange} min={1} max={10000000}
                                        disabled={pathname.endsWith('/view')}/>
                    <NumberTextFieldCard title={'Rarity'} value={armor.rarity} onChange={handleRarityChange}
                                         min={0}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                </Grid>
                <ArmorQualityCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
                <ArmorModifierCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
            </CardContent>
        </Card>
    )
}
