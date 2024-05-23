import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {ActorPath, CampaignPath, EquipmentPath, LorePath, Path} from '../../services/Path';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import * as React from 'react';
import {ViewAllLore} from "../lore/common/ViewAllLore";
import OrganizationWorkflow from "../lore/organization/OrganizationWorkflow";
import TalentWorkflow from "../talents/TalentWorkflow";
import SkillWorkflow from "../skills/SkillWorkflow";
import ArmorWorkflow from "../equipment/armor/ArmorWorkflow";
import WeaponWorkflow from "../equipment/weapon/WeaponWorkflow";
import GearWorkflow from "../equipment/gear/GearWorkflow";
import NemesisWorkflow from "../actor/npc/nemesis/NemesisWorkflow";
import PlayerWorkflow from "../actor/player/PlayerWorkflow";
import RivalWorkflow from "../actor/npc/rival/RivalWorkflow";
import MinionWorkflow from "../actor/npc/minion/MinionWorkflow";
import SettingWorkflow from "../setting/SettingWorkflow";
import QualityWorkflow from "../qualities/QualityWorkflow";
import HomeDashboard from "./HomeDashboard";
import InjuryWorkflow from "../injuries/InjuryWorkflow";
import SpellWorkflow from "../spell/SpellWorkflow";
import CareerWorkflow from "../career/CareerWorkflow";
import ArchetypeWorkflow from "../archetype/ArchetypeWorkflow";
import CampaignWorkflow from "../campaign/CampaignWorkflow";
import SessionWorkflow from "../campaign/session/SessionWorkflow";
import SceneWorkflow from "../campaign/scene/SceneWorkflow";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'light'}})}>
            <HashRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path={Path.Home} element={<HomeDashboard/>}/>

                    <Route path={Path.Injury} element={<InjuryWorkflow/>}/>
                    <Route path={Path.Injury + ':name/view'} element={<InjuryWorkflow/>}/>
                    <Route path={Path.Injury + ':name/edit'} element={<InjuryWorkflow/>}/>

                    <Route path={Path.Spell} element={<SpellWorkflow/>}/>
                    <Route path={Path.Spell + ':name/view'} element={<SpellWorkflow/>}/>
                    <Route path={Path.Spell + ':name/edit'} element={<SpellWorkflow/>}/>

                    <Route path={Path.Setting} element={<SettingWorkflow/>}/>
                    <Route path={Path.Setting + ':name/view'} element={<SettingWorkflow/>}/>
                    <Route path={Path.Setting + ':name/edit'} element={<SettingWorkflow/>}/>

                    <Route path={Path.Talent} element={<TalentWorkflow/>}/>
                    <Route path={Path.Talent + ':name/view'} element={<TalentWorkflow/>}/>
                    <Route path={Path.Talent + ':name/edit'} element={<TalentWorkflow/>}/>

                    <Route path={Path.Qualities} element={<QualityWorkflow/>}/>
                    <Route path={Path.Qualities + ':name/view'} element={<QualityWorkflow/>}/>
                    <Route path={Path.Qualities + ':name/edit'} element={<QualityWorkflow/>}/>

                    <Route path={Path.Skills} element={<SkillWorkflow/>}/>
                    <Route path={Path.Skills + ':name/edit'} element={<SkillWorkflow/>}/>
                    <Route path={Path.Skills + ':name/view'} element={<SkillWorkflow/>}/>

                    <Route path={Path.Career} element={<CareerWorkflow/>}/>
                    <Route path={Path.Career + ':name/edit'} element={<CareerWorkflow/>}/>
                    <Route path={Path.Career + ':name/view'} element={<CareerWorkflow/>}/>

                    <Route path={Path.Archetype} element={<ArchetypeWorkflow/>}/>
                    <Route path={Path.Archetype + ':name/edit'} element={<ArchetypeWorkflow/>}/>
                    <Route path={Path.Archetype + ':name/view'} element={<ArchetypeWorkflow/>}/>

                    {/*Actor Routes*/}
                    <Route path={ActorPath.Player} element={<ViewAllPlayers/>}/>
                    <Route path={ActorPath.Player + ':name/edit'} element={<PlayerWorkflow/>}/>
                    <Route path={ActorPath.Player + ':name/view'} element={<PlayerWorkflow/>}/>

                    <Route path={ActorPath.Nemesis} element={<AllNemesesView/>}/>
                    <Route path={ActorPath.Nemesis + ':name/edit'} element={<NemesisWorkflow/>}/>
                    <Route path={ActorPath.Nemesis + ':name/view'} element={<NemesisWorkflow/>}/>

                    <Route path={ActorPath.Rival} element={<AllRivalsView/>}/>
                    <Route path={ActorPath.Rival + ':name/edit'} element={<RivalWorkflow/>}/>
                    <Route path={ActorPath.Rival + ':name/view'} element={<RivalWorkflow/>}/>

                    <Route path={ActorPath.Minion} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':name/edit'} element={<MinionWorkflow/>}/>
                    <Route path={ActorPath.Minion + ':name/view'} element={<MinionWorkflow/>}/>

                    {/*Equipment Routes*/}
                    <Route path={EquipmentPath.Armor} element={<ArmorWorkflow/>}/>
                    <Route path={EquipmentPath.Armor + ':name/edit'} element={<ArmorWorkflow/>}/>
                    <Route path={EquipmentPath.Armor + ':name/view'} element={<ArmorWorkflow/>}/>

                    <Route path={EquipmentPath.Weapon} element={<WeaponWorkflow/>}/>
                    <Route path={EquipmentPath.Weapon + ':name/edit'} element={<WeaponWorkflow/>}/>
                    <Route path={EquipmentPath.Weapon + ':name/view'} element={<WeaponWorkflow/>}/>

                    <Route path={EquipmentPath.Gear} element={<GearWorkflow/>}/>
                    <Route path={EquipmentPath.Gear + ':name/edit'} element={<GearWorkflow/>}/>
                    <Route path={EquipmentPath.Gear + ':name/view'} element={<GearWorkflow/>}/>

                    {/*Lore Routes*/}
                    <Route path={Path.Lore} element={<ViewAllLore/>}/>

                    <Route path={LorePath.Organization} element={<OrganizationWorkflow/>}/>
                    <Route path={LorePath.Organization + ':name/view'} element={<OrganizationWorkflow/>}/>
                    <Route path={LorePath.Organization + ':name/edit'} element={<OrganizationWorkflow/>}/>

                    {/*Campaign Routes*/}
                    <Route path={CampaignPath.Campaign} element={<CampaignWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':name'} element={<CampaignWorkflow/>}/>

                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session} element={<SessionWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + ':sessionName/view'} element={<SessionWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + ':sessionName/edit'} element={<SessionWorkflow/>}/>

                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene} element={<SceneWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene + ':name/view'} element={<SceneWorkflow/>}/>
                    <Route path={CampaignPath.Campaign + ':campaignName' + CampaignPath.Session + CampaignPath.Scene + ':name/edit'} element={<SceneWorkflow/>}/>

                    {/*<Route path={Path.Scene} element={<SceneWorkflow/>}/>*/}
                    {/*<Route path={Path.Scene + ':name/view'} element={<SceneWorkflow/>}/>*/}
                    {/*<Route path={Path.Scene + ':name/edit'} element={<SceneWorkflow/>}/>*/}
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}