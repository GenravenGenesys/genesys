// import {Alert, Card, CardContent, CircularProgress} from '@mui/material';
// import * as React from "react";
// import {useLocation, useParams} from "react-router";
// import {Fragment, useEffect, useState} from "react";
// import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
// import {RootPath} from "../../services/RootPath";
// import TabList from "@mui/lab/TabList/TabList";
// import Tab from "@mui/material/Tab";
// import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
// import TalentBaseTab from "./TalentBaseTab";
// import TalentModifierTab from "./TalentModifierTab";
// import GridContainer from "../common/grid/GridContainer";
// import TalentActionTab from './action/TalentActionTab';
// import {getTalentController} from "../../api/generated/talent-controller/talent-controller.ts";
// import {Activation, type Talent} from "../../api/model";
//
// export default function TalentPage() {
//     const {id} = useParams<{ id: string }>();
//     const [talent, setTalent] = useState<Talent | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [tab, setTab] = useState('1');
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
//                 const response = await getTalentController().getTalent(id);
//                 setTalent(response);
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
//     if (!talent || !id) {
//         return <Fragment/>;
//     }
//
//     const handleChange = (_: React.SyntheticEvent, newValue: string) => {
//         setTab(newValue);
//     };
//
//     const updateTalent = async (updatedTalent: Talent) => {
//         if (talent) {
//             setTalent(await getTalentController().updateTalent(id, updatedTalent));
//         }
//     };
//
//     return (
//         <Card>
//             <CenteredCardHeaderWithAction title={talent.name} path={RootPath.Talent + talent.id}/>
//             <CardContent>
//                 <TabContext value={tab}>
//                     <GridContainer centered>
//                         <TabList onChange={handleChange} centered>
//                             <Tab label="Base" value="1"/>
//                             <Tab label="Modifiers" value="2"/>
//                             <Tab label="Action" value="3" disabled={talent.activation !== Activation["Active_(Action)"]}/>
//                         </TabList>
//                     </GridContainer>
//                     <TabPanel value="1">
//                         <TalentBaseTab talent={talent} updateTalent={updateTalent} disabled={!pathname.endsWith(talent.id + '/edit')}/>
//                     </TabPanel>
//                     <TabPanel value="2">
//                         <TalentModifierTab talent={talent} updateTalent={updateTalent} disabled={!pathname.endsWith(talent.id + '/edit')}/>
//                     </TabPanel>
//                     <TabPanel value="3">
//                         <TalentActionTab talent={talent} updateTalent={updateTalent} disabled={!pathname.endsWith(talent.id + '/edit')}/>
//                     </TabPanel>
//                 </TabContext>
//             </CardContent>
//         </Card>
//     );
// }
