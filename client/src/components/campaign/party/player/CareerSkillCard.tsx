// import {useState} from "react";
// import {Alert, Autocomplete, Card, CardContent, CircularProgress, IconButton, TextField,} from "@mui/material";
// import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
// import InfoIcon from "@mui/icons-material/Info";
// import CareerBackdrop from "../../career/CareerBackdrop";
// import EditIcon from "@mui/icons-material/Edit";
// import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
// import {useLocation} from "react-router";
// import ViewFieldCard from "../../../common/ViewFieldCard";
// import GridItem from "../../../common/grid/GridItem";
// import GridContainer from "../../../common/grid/GridContainer";
// import {useFetchAllCareers} from "../../../../hooks/useFetchAllCareers.ts";
// import type {Career, Player, PlayerSkill} from "../../../../api/model";
//
// interface Props {
//     player: Player;
//     onCommit: (value: Career) => void;
//     onSkillSelect: (skills: PlayerSkill[]) => void;
// }
//
// export default function CareerSelectCard(props: Props) {
//     const {player, onCommit, onSkillSelect} = props;
//     const [openCareerBackDrop, setOpenCareerBackDrop] = useState(false);
//     const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false);
//     const {careers, loading, error} = useFetchAllCareers();
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
//     return useLocation().pathname.endsWith("/view") ?
//         <ViewFieldCard name={"Career"} value={player.career.name}/> :
//         <GridItem>
//             <Card>
//                 <CenteredCardHeader title={'Career'}/>
//                 <CardContent>
//                     <GridContainer>
//                         <GridItem width={.8}>
//                             <Autocomplete
//                                 options={careers}
//                                 getOptionLabel={(option) => option.name}
//                                 value={player.career}
//                                 fullWidth
//                                 onChange={(_, newValue) => onCommit(newValue as Career)}
//                                 renderInput={(params) => <TextField {...params} label='Career'
//                                                                     variant="outlined"/>}
//                             />
//                         </GridItem>
//                         <GridItem width={.1}>
//                             <IconButton onClick={(): void => setOpenCareerSkillDialog(true)}>
//                                 <EditIcon/>
//                             </IconButton>
//                             {openCareerSkillDialog &&
//                                 <CareerSkillSelectDialog open={openCareerSkillDialog}
//                                                          onClose={(): void => setOpenCareerSkillDialog(false)}
//                                                          player={player} onSelect={onSkillSelect}/>}
//                         </GridItem>
//                         <GridItem width={.1}>
//                             <IconButton onClick={(): void => setOpenCareerBackDrop(true)}>
//                                 <InfoIcon/>
//                             </IconButton>
//                             {openCareerBackDrop &&
//                                 <CareerBackdrop open={openCareerBackDrop}
//                                                 onClose={(): void => setOpenCareerBackDrop(false)}
//                                                 career={player.career}/>}
//                         </GridItem>
//                     </GridContainer>
//                 </CardContent>
//             </Card>
//         </GridItem>
// };