// import {Alert, Card, CardContent, CircularProgress} from '@mui/material';
// import {useLocation, useParams} from "react-router";
// import {RootPath} from "../../../services/RootPath";
// import {Fragment, useEffect, useState} from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import {renderSingleRowTableHeaderWithColumns} from "../../common/table/TableRenders";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableContainer from "@mui/material/TableContainer";
// import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
// import SkillAutocompleteTableCell from "../../common/table/SkillAutocompleteTableCell";
// import GridContainer from "../../common/grid/GridContainer";
// import {useFetchAllSkills} from "../../../hooks/useFetchAllSkills.ts";
// import type {Career, Skill} from "../../../api/model";
// import {getCareerController} from "../../../api/generated/career-controller/career-controller.ts";
//
// export default function CareerPage() {
//     const {id} = useParams<{ id: string }>();
//     const [career, setCareer] = useState<Career | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const {skills} = useFetchAllSkills();
//     const pathname = useLocation().pathname;
//     const headers = ['Career Skills'];
//
//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await getCareerController().getCareer(id);
//                 setCareer(response);
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
//     if (!career || !id) {
//         return <Fragment/>;
//     }
//
//     const handleSkillChange = async (index: number, value: Skill) => {
//         const updatedSkills = career.skills.map((row, i) =>
//             i === index ? {...value} : row
//         );
//         setCareer(await getCareerController().updateCareer(id, {...career, skills: updatedSkills}));
//     };
//
//     return (
//         <Card>
//             <CenteredCardHeaderWithAction title={career.name} path={RootPath.Career + career.id}/>
//             <CardContent>
//                 <GridContainer centered>
//                     <TableContainer component={Paper}>
//                         <Table>
//                             {renderSingleRowTableHeaderWithColumns(headers, 2)}
//                             <TableBody>
//                                 {career.skills.map((_skill, index) => (
//                                     index % 2 === 0 && (
//                                         <TableRow key={index}>
//                                             <SkillAutocompleteTableCell skill={career.skills[index]} skills={skills}
//                                                                         onChange={handleSkillChange} index={index}
//                                                                         disabled={!pathname.endsWith(career.id + '/edit')}/>
//                                             {career.skills[index + 1] && (
//                                                 <SkillAutocompleteTableCell skill={career.skills[index + 1]}
//                                                                             skills={skills}
//                                                                             onChange={handleSkillChange}
//                                                                             index={index + 1}
//                                                                             disabled={!pathname.endsWith(career.id + '/edit')}/>
//                                             )}
//                                         </TableRow>
//                                     )
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </GridContainer>
//             </CardContent>
//         </Card>
//     );
// }
