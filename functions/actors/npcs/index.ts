import NonPlayerActor from "../../../src/models/actor/npc/NonPlayerActor";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Rival, Nemesis, Minion').all<NonPlayerActor>();
    return Response.json(results);
}