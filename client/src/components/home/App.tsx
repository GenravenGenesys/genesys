import {Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {ActorPath, CampaignPath, EquipmentPath, LorePath, RootPath} from '../../services/RootPath';
import AllNemesesView from '../campaign/npc/nemesis/CampaignNemeses';
import * as React from 'react';
import {ViewAllLore} from "../lore/common/ViewAllLore";
import OrganizationWorkflow from "../lore/organization/OrganizationWorkflow";
import TalentWorkflow from "../talents/TalentWorkflow";
import SkillWorkflow from "../skills/SkillWorkflow";
import NemesisWorkflow from "../campaign/npc/nemesis/NemesisWorkflow";
import RivalWorkflow from "../campaign/npc/rival/RivalWorkflow";
import MinionWorkflow from "../campaign/npc/minion/MinionWorkflow";
import QualityWorkflow from "../qualities/QualityWorkflow";
import InjuryWorkflow from "../injuries/InjuryWorkflow";
import SpellWorkflow from "../spell/SpellWorkflow";
import CareerWorkflow from "../campaign/career/CareerWorkflow";
import ArchetypeWorkflow from "../campaign/archetype/ArchetypeWorkflow";
import CampaignWorkflow from "../campaign/CampaignWorkflow";
import HomeCampaignDashboard from "./HomeCampaignDashboard";
import PlayerWorkflow from "../campaign/party/player/PlayerWorkflow";
import ArmorWorkflow from "../campaign/equipment/armor/ArmorWorkflow";
import WeaponWorkflow from "../campaign/equipment/weapon/WeaponWorkflow";
import GearWorkflow from '../campaign/equipment/gear/GearWorkflow';
import SessionPage from "../campaign/session/SessionPage";
import EditableScenePage from "../campaign/scene/EditableScenePage";
import ScenePage from "../campaign/scene/ScenePage";
import EncounterPage from "../campaign/scene/encounter/EncounterPage";
import {useAuth0} from "@auth0/auth0-react";
import {PageLoader} from "../../auth/PageLoader";
import {AuthenticationGuard} from "../../auth/AuthenticationGuard";
import {AdminPage} from "../../auth/AdminPage";

export const App: React.FC = () => {
    const {isLoading} = useAuth0();

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader />
            </div>
        );
    }
    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>
            <NavBar/>
            <Routes>
                {/*<Route*/}
                {/*    path="/profile"*/}
                {/*    element={<AuthenticationGuard component={ProfilePage} />}*/}
                {/*/>*/}
                {/*<Route path="/public" element={<PublicPage />} />*/}
                {/*<Route*/}
                {/*    path="/protected"*/}
                {/*    element={<AuthenticationGuard component={ProtectedPage} />}*/}
                {/*/>*/}
                <Route
                    path="/admin"
                    element={<AuthenticationGuard component={AdminPage} />}
                />
                {/*<Route path="/callback" element={<CallbackPage />} />*/}
                <Route path="/" element={<Navigate replace to="/home"/>}/>
                <Route path={RootPath.Home} element={<HomeCampaignDashboard/>}/>

                <Route path={RootPath.Injury} element={<InjuryWorkflow/>}/>
                <Route path={RootPath.Injury + ':id/view'} element={<InjuryWorkflow/>}/>
                <Route path={RootPath.Injury + ':id/edit'} element={<InjuryWorkflow/>}/>

                <Route path={RootPath.Spell} element={<SpellWorkflow/>}/>
                <Route path={RootPath.Spell + ':id/view'} element={<SpellWorkflow/>}/>
                <Route path={RootPath.Spell + ':id/edit'} element={<SpellWorkflow/>}/>

                <Route path={RootPath.Talent} element={<TalentWorkflow/>}/>
                <Route path={RootPath.Talent + ':id/view'} element={<TalentWorkflow/>}/>
                <Route path={RootPath.Talent + ':id/edit'} element={<TalentWorkflow/>}/>

                <Route path={RootPath.Qualities} element={<QualityWorkflow/>}/>
                <Route path={RootPath.Qualities + ':id/view'} element={<QualityWorkflow/>}/>
                <Route path={RootPath.Qualities + ':id/edit'} element={<QualityWorkflow/>}/>

                <Route path={RootPath.Skills} element={<SkillWorkflow/>}/>
                <Route path={RootPath.Skills + ':id/edit'} element={<SkillWorkflow/>}/>
                <Route path={RootPath.Skills + ':id/view'} element={<SkillWorkflow/>}/>

                <Route path={RootPath.Career} element={<CareerWorkflow/>}/>
                <Route path={RootPath.Career + ':id/edit'} element={<CareerWorkflow/>}/>
                <Route path={RootPath.Career + ':id/view'} element={<CareerWorkflow/>}/>

                <Route path={RootPath.Archetype} element={<ArchetypeWorkflow/>}/>
                <Route path={RootPath.Archetype + ':id/edit'} element={<ArchetypeWorkflow/>}/>
                <Route path={RootPath.Archetype + ':id/view'} element={<ArchetypeWorkflow/>}/>

                {/*Actor Routes*/}
                <Route path={ActorPath.Player} element={<PlayerWorkflow/>}/>
                <Route path={ActorPath.Player + ':id/edit'} element={<PlayerWorkflow/>}/>
                <Route path={ActorPath.Player + ':id/view'} element={<PlayerWorkflow/>}/>

                <Route path={ActorPath.Nemesis} element={<AllNemesesView/>}/>
                <Route path={ActorPath.Nemesis + ':id/edit'} element={<NemesisWorkflow/>}/>
                <Route path={ActorPath.Nemesis + ':id/view'} element={<NemesisWorkflow/>}/>

                <Route path={ActorPath.Rival} element={<RivalWorkflow/>}/>
                <Route path={ActorPath.Rival + ':id/edit'} element={<RivalWorkflow/>}/>
                <Route path={ActorPath.Rival + ':id/view'} element={<RivalWorkflow/>}/>

                <Route path={ActorPath.Minion} element={<MinionWorkflow/>}/>
                <Route path={ActorPath.Minion + ':id/edit'} element={<MinionWorkflow/>}/>
                <Route path={ActorPath.Minion + ':id/view'} element={<MinionWorkflow/>}/>

                {/*Equipment Routes*/}
                <Route path={EquipmentPath.Armor} element={<ArmorWorkflow/>}/>
                <Route path={EquipmentPath.Armor + ':id/edit'} element={<ArmorWorkflow/>}/>
                <Route path={EquipmentPath.Armor + ':id/view'} element={<ArmorWorkflow/>}/>

                <Route path={EquipmentPath.Weapon} element={<WeaponWorkflow/>}/>
                <Route path={EquipmentPath.Weapon + ':id/edit'} element={<WeaponWorkflow/>}/>
                <Route path={EquipmentPath.Weapon + ':id/view'} element={<WeaponWorkflow/>}/>

                <Route path={EquipmentPath.Gear} element={<GearWorkflow/>}/>
                <Route path={EquipmentPath.Gear + ':id/edit'} element={<GearWorkflow/>}/>
                <Route path={EquipmentPath.Gear + ':id/view'} element={<GearWorkflow/>}/>

                <Route path={RootPath.Scenes + ':id/edit'} element={<EditableScenePage/>}/>
                <Route path={RootPath.Scenes + ':id/view'} element={<EditableScenePage/>}/>

                {/*Lore Routes*/}
                <Route path={CampaignPath.Lore} element={<ViewAllLore/>}/>

                <Route path={LorePath.Organization} element={<OrganizationWorkflow/>}/>
                <Route path={LorePath.Organization + ':id/view'} element={<OrganizationWorkflow/>}/>
                <Route path={LorePath.Organization + ':id/edit'} element={<OrganizationWorkflow/>}/>

                {/*Campaign Routes*/}
                <Route path={CampaignPath.Campaign} element={<CampaignWorkflow/>}/>
                <Route path={CampaignPath.Campaign + ':id'} element={<CampaignWorkflow/>}/>

                <Route path={RootPath.Session + ':name'} element={<SessionPage/>}/>

                <Route path={CampaignPath.Scene + ':id'} element={<ScenePage/>}/>
                <Route path={CampaignPath.Scene + ':id/encounter/:type'} element={<EncounterPage/>}/>
            </Routes>
        </ThemeProvider>
    )
}