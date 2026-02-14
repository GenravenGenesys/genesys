import {Navigate, Route, Routes} from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {RootPath} from '../../services/RootPath';
import * as React from 'react';
import {PageLoader} from "../../auth/PageLoader";
import {AuthenticationGuard} from "../../auth/AuthenticationGuard";
import {AdminPage} from "../../auth/AdminPage";
import ProfilePage from "../../auth/ProfilePage";
import CallbackPage from "../../auth/CallBackPage";
import SampleCompendiumHome from "./sample/CompendiumSample.tsx";
import TalentListView from "./sample/SampleTalents.tsx";
import EquipmentListView from "./sample/EquipmentList.tsx";
import AdversaryCompendium from "./sample/ViewAllAdvesaries.tsx";
import SampleSessionManager from "./sample/SampleSessionManager.tsx";
import CharacterCreator from "./sample/PlayerCreation.tsx";
import CampaignDashboardPage from "./new/HomeDashboard.tsx";
import CompendiumHome from "./sample/compendium/CompendiumHome.tsx";
import ViewCompendiumSkills from "./sample/compendium/skill/ViewCompendiumSkills.tsx";
import ViewCompendiumTalents from "./sample/compendium/talent/ViewCompendiumTalents.tsx";
import ViewCompendiumAdversaries from "./sample/compendium/adversary/ViewCompendiumAdversaries.tsx";
import ViewCompendiumItems from "./sample/compendium/equipment/ViewCompendiumItems.tsx";
import ActiveSessionView from "./new/session/ActiveSessionView.tsx";
import GenesysSessionManager from "./sample/GenesysSessionManager.tsx";
import SessionManager from "./new/session/SessionManager.tsx";
import SampleSessionManagementPage from "./sample/SampleSessionManagementPage.tsx";
import ViewCompendiumArchetypes from "./sample/compendium/archetype/ViewCompendiumArchetypes.tsx";
import ViewCompendiumCareers from "./sample/compendium/career/ViewCompendiumCareers.tsx";
import PartyPage from "./sample/party/PartyPage.tsx";
import {useOptionalAuth0} from "../../hooks/useOptionalAuth0";
import ViewCompendiumInjuries from "./sample/compendium/injury/ViewCriticalInjuries.tsx";
import ViewCompendiumQualities from "./sample/compendium/quality/ViewCompendiumQualities.tsx";

export const App: React.FC = () => {
    const {isLoading} = useOptionalAuth0();

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {main: '#00e5ff'},
            background: {default: '#050c14', paper: '#0a1929'},
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdrop: 'blur(12px)',
                    },
                },
            },
        },
    });

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader/>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <NavBar/>
            <Routes>
                <Route
                    path="/profile"
                    element={<AuthenticationGuard component={ProfilePage}/>}
                />
                {/*<Route path="/public" element={<PublicPage />} />*/}
                {/*<Route*/}
                {/*    path="/protected"*/}
                {/*    element={<AuthenticationGuard component={ProtectedPage} />}*/}
                {/*/>*/}
                <Route
                    path="/admin"
                    element={<AuthenticationGuard component={AdminPage}/>}
                />
                <Route path="/callback" element={<CallbackPage/>}/>
                <Route path="/" element={<Navigate replace to={"/" + RootPath.Home}/>}/>
                <Route path={RootPath.Home} element={<CampaignDashboardPage/>}/>

                <Route path={RootPath.Campaign + ":id/party"} element={<PartyPage/>}/>

                <Route path={RootPath.Campaign + ":id/compendium"} element={<CompendiumHome/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Skills} element={<ViewCompendiumSkills/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Talent}
                       element={<ViewCompendiumTalents/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Adversary}
                       element={<ViewCompendiumAdversaries/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Equipment}
                       element={<ViewCompendiumItems/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Archetype}
                       element={<ViewCompendiumArchetypes/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Career}
                       element={<ViewCompendiumCareers/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Injury}
                       element={<ViewCompendiumInjuries/>}/>
                <Route path={RootPath.Campaign + ":id/compendium" + RootPath.Qualities}
                       element={<ViewCompendiumQualities/>}/>

                <Route path={RootPath.Campaign + ":id"} element={<SessionManager/>}/>
                <Route path={RootPath.Campaign + ":id" + RootPath.Session + ":sessionId"}
                       element={<ActiveSessionView/>}/>

                <Route path={"/sample/comp"} element={<SampleCompendiumHome/>}/>
                <Route path={"/sample/talents"} element={<TalentListView/>}/>
                <Route path={"/sample/equipment"} element={<EquipmentListView/>}/>
                <Route path={"/sample/adversaries"} element={<AdversaryCompendium/>}/>
                <Route path={"/sample/session"} element={<SampleSessionManager/>}/>
                <Route path={"/genesys/session"} element={<GenesysSessionManager/>}/>
                <Route path={"/genesys/session/manager"} element={<SampleSessionManagementPage/>}/>
                <Route path={"/sample/creation"} element={<CharacterCreator/>}/>
            </Routes>
        </ThemeProvider>
    )
}