import {Fragment} from "react";
import {useLocation} from "react-router";
import {ActorPath} from "../../../../services/RootPath";
import PlayerPage from "./PlayerPage";
import ViewAllPlayers from "./ViewAllPlayers";

export default function PlayerWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Player) ? <ViewAllPlayers/> : <PlayerPage/>}
        </Fragment>
    )
}