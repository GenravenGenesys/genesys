// import {type ChangeEvent, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {Dialog, DialogContentText, TextField} from "@mui/material";
// import {CampaignPath} from "../../services/RootPath";
// import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
// import {getCampaignController} from "../../api/generated/campaign-controller/campaign-controller.ts";
// import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle.tsx";
// import {
//     getCurrentCampaignController
// } from "../../api/generated/current-campaign-controller/current-campaign-controller.ts";
//
// interface Props {
//     open: boolean;
//     onClose: () => void;
// }
//
// export default function CampaignDialog(props: Props) {
//     const {open, onClose} = props;
//     const [name, setName] = useState('');
//     const navigate = useNavigate();
//
//     const handleCreate = async (): Promise<void> => {
//         const campaign = await getCampaignController().createCampaign(name);
//         await getCurrentCampaignController().setCurrentCampaign(campaign.id);
//         navigate(CampaignPath.Campaign + campaign.name);
//         onClose();
//     };
//
//     const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const {value} = event.target;
//         setName(value);
//     };
//
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <CenteredDialogTitle title={'Create New Campaign'}/>
//             <DialogContentText>
//                 <TextField onChange={onChange} value={name} required/>
//             </DialogContentText>
//             <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
//         </Dialog>
//     );
// }