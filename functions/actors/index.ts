import Actor from "../../src/models/actor/Actor";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Rival, Nemesis, Minion, Player').all<Actor>();
    return Response.json(results);
}