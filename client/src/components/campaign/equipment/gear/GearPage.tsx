import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import type {Gear} from "../../../../models/equipment/Gear.ts";
import GearService from "../../../../services/equipment/GearService.ts";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction.tsx";
import {EquipmentPath} from "../../../../services/RootPath.ts";
import GridContainer from "../../../common/grid/GridContainer.tsx";
import TextFieldCard from "../../../common/card/TextFieldCard.tsx";
import NumberTextFieldCard from "../../../common/card/NumberTextFieldCard.tsx";
import BooleanTextFieldCard from "../../../common/card/BooleanTextFieldCard.tsx";
import PriceTextFieldCard from "../../../common/card/PriceTextFieldCard.tsx";

const GearPage = () => {
    const {id} = useParams<{ id: string }>();
    const [gear, setGear] = useState<Gear | null>(null);
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setGear(await GearService.getGear(id));
        })()
    }, [id, setGear])

    if (!gear) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (value: string) => {
        if (gear) {
            await updateGear({...gear, description: value});
        }
    };

    const handleEncumbranceChange = async (value: number) => {
        if (gear) {
            await updateGear({...gear, encumbrance: value});
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (gear) {
            await updateGear({...gear, restricted: value});
        }
    };

    const handlePriceChange = async (value: number) => {
        if (gear) {
            await updateGear({...gear, price: value});
        }
    };

    const handleRarityChange = async (value: number) => {
        if (gear) {
            await updateGear({...gear, rarity: value})
        }
    };

    const updateGear = async (updatedGear: Gear) => {
        setGear(await GearService.updateGear(updatedGear));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={gear.name} path={EquipmentPath.Gear + gear.id}/>
            <CardContent>
                <GridContainer centered>
                    <TextFieldCard title={"Description"} value={gear.description}
                                   disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                </GridContainer>
                <GridContainer centered>
                    <NumberTextFieldCard title={'Encumbrance'} value={gear.encumbrance}
                                         onChange={handleEncumbranceChange} min={1}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                    <BooleanTextFieldCard title={'Restricted'} value={gear.restricted}
                                          disabled={pathname.endsWith('/view')} onChange={handleRestrictedChange}/>
                    <PriceTextFieldCard price={gear.price} restricted={gear.restricted}
                                        onChange={handlePriceChange} min={1} max={10000000}
                                        disabled={pathname.endsWith('/view')}/>
                    <NumberTextFieldCard title={'Rarity'} value={gear.rarity} onChange={handleRarityChange}
                                         min={0}
                                         max={10} disabled={pathname.endsWith('/view')}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
}

export default GearPage;