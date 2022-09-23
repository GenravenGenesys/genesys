import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, ThemeProvider} from '@mui/material';
import {LorePath, Path} from '../../services/Path';
import AllTalentsView from '../talents/AllTalentsViewTable';
import TalentView from '../talents/TalentView';
import ViewAllPlayers from '../actor/player/ViewAllPlayers';
import PlayerView from '../actor/player/PlayerView';
import NemesisEdit from '../actor/npc/nemesis/NemesisEdit';
import NemesisView from '../actor/npc/nemesis/NemesisView';
import AllNemesesView from '../actor/npc/nemesis/ViewAllNemeses';
import ViewAllSkills from '../skills/ViewAllSkills';
import SkillView from '../skills/SkillView';
import AllRivalsView from '../actor/npc/rival/ViewAllRivals';
import RivalView from '../actor/npc/rival/RivalView';
import ViewAllArmor from '../equipment/armor/ViewAllArmor';
import EditArmor from '../equipment/armor/EditArmor';
import ViewArmor from '../equipment/armor/ViewArmor';
import * as React from 'react';
import Dashboard from "./Dashboard";
import LoreMenu from "../lore/common/LoreMenu";
import {Lore} from "../../models/lore/Lore";
import {ViewAllLore} from "../lore/common/ViewAllLore";

export default function App() {

    return (
        <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})} >
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path={Path.Home} element={<Dashboard/>} />
                    <Route path={Path.Talent} element={<AllTalentsView />} />
                    <Route path={Path.Talent + ':name'} element={<TalentView />} />
                    <Route path={Path.Player} element={<ViewAllPlayers />} />
                    <Route path={Path.Player + ':name'} element={<PlayerView />} />
                    <Route path={Path.Nemesis + ':name/edit'} element={<NemesisEdit />} />
                    <Route path={Path.Nemesis + ':name/view'} element={<NemesisView />} />
                    <Route path={Path.Nemesis} element={<AllNemesesView />} />
                    <Route path={Path.Skills} element={<ViewAllSkills />} />
                    <Route path={Path.Skills + ':name'} element={<SkillView />} />
                    <Route path={Path.Rival} element={<AllRivalsView />} />
                    <Route path={Path.Rival + ':name'} element={<RivalView />} />
                    <Route path={Path.Armor} element={<ViewAllArmor/>} />
                    <Route path={Path.Armor + ':name/edit'} element={<EditArmor/>} />
                    <Route path={Path.Armor + ':name/view'} element={<ViewArmor/>} />
                    // Lore Routes
                    <Route path={Path.Lore} element={<ViewAllLore />} />
                    <Route path={LorePath.Organization} element={<LoreMenu lore={Lore.ORGANIZATION}/>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}