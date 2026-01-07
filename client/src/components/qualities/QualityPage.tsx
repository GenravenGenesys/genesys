// import {Alert, Card, CardContent, CircularProgress} from '@mui/material';
// import {useLocation, useParams} from "react-router";
// import {RootPath} from "../../services/RootPath";
// import {Fragment, useEffect, useState} from "react";
// import QualityModifierCard from "./modifiers/QualityModifierCard";
// import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
// import NumberTextFieldCard from "../common/card/NumberTextFieldCard";
// import TextFieldCard from "../common/card/TextFieldCard";
// import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard";
// import GridContainer from "../common/grid/GridContainer";
// import type {Quality} from "../../api/model";
// import {getQualityController} from "../../api/generated/quality-controller/quality-controller.ts";
//
// const QualityPage = ()=> {
//     const {id} = useParams<{ id: string }>();
//     const [quality, setQuality] = useState<Quality | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const pathname = useLocation().pathname;
//
//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await getQualityController().getQuality(id);
//                 setQuality(response);
//             } catch (err) {
//                 setError('Failed to load injury.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     if (loading) {
//         return <CircularProgress/>;
//     }
//
//     if (error) {
//         return (
//             <Alert severity="error">
//                 {error}
//             </Alert>
//         );
//     }
//
//     if (!quality || !id) {
//         return <Fragment/>;
//     }
//
//     const handleDescriptionChange = async (value: string) => {
//         if (quality) {
//             await updateQuality({...quality, description: value});
//         }
//     };
//
//     const handleArmorQualityChange = async (value: boolean) => {
//         if (quality) {
//             await updateQuality({...quality, armor: value});
//         }
//     };
//
//     const handleWeaponQualityChange = async (value: boolean) => {
//         if (quality) {
//             await updateQuality({...quality, weapon: value});
//         }
//     };
//
//     const handleCostChange = async (value: number) => {
//         if (quality) {
//             await updateQuality({...quality, cost: value});
//         }
//     };
//
//     const updateQuality = async (updatedQuality: Quality) => {
//         if (updatedQuality) {
//             setQuality(await getQualityController().updateQuality(id, updatedQuality));
//         }
//     };
//
//     return (
//         <Card>
//             <CenteredCardHeaderWithAction title={quality.name!} path={RootPath.Qualities + quality.id}/>
//             <CardContent>
//                 <GridContainer centered>
//                     <GridContainer centered>
//                         <TextFieldCard title={"Description"} value={quality.description!}
//                                        disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
//                     </GridContainer>
//                     <GridContainer spacing={2}>
//                         <BooleanTextFieldCard title={"Armor Quality"} value={quality.armor!}
//                                               disabled={pathname.endsWith('/view')}
//                                               onChange={handleArmorQualityChange}/>
//                         <BooleanTextFieldCard title={"Weapon Quality"} value={quality.weapon!}
//                                               disabled={pathname.endsWith('/view')}
//                                               onChange={handleWeaponQualityChange}/>
//                         <NumberTextFieldCard title={"Advantage Cost"} value={quality.cost!} onChange={handleCostChange}
//                                              min={0} max={3} disabled={pathname.endsWith('/view')}/>
//                     </GridContainer>
//                     <QualityModifierCard quality={quality} updateQuality={updateQuality}/>
//                 </GridContainer>
//             </CardContent>
//         </Card>
//     );
// };
//
// export default QualityPage;