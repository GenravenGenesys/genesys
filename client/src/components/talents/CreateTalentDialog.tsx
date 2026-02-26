// import {Dialog, DialogContentText, TextField} from "@mui/material";
// import {type ChangeEvent, useState} from "react";
// import {useNavigate} from "react-router";
// import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
// import {RootPath} from "../../services/RootPath";
// import {getTalentController} from "../../api/generated/talent-controller/talent-controller.ts";
// import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle.tsx";
//
// interface Props {
//     open: boolean
//     onClose: () => void
// }
//
// export default function TalentDialog(props: Props) {
//     const {open, onClose} = props
//     const [name, setName] = useState('')
//     const navigate = useNavigate()
//
//     const handleCreate = async (): Promise<void> => {
//         const talent = await getTalentController().createTalent(name);
//         navigate(RootPath.Talent + talent.id + '/edit')
//         onClose()
//     }
//
//     const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const {value} = event.target
//         setName(value)
//     }
//
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <CenteredDialogTitle title={'Name New Talent'}/>
//             <DialogContentText>
//                 <TextField onChange={onChange} value={name} required/>
//             </DialogContentText>
//             <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
//         </Dialog>
//     )
// }
