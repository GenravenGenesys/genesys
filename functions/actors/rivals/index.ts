import Rival from "../../../src/models/actor/npc/Rival";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Rival').all<Rival>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Rival
    const result = await context.env.GENESYS.prepare('INSERT INTO Rival (actor_id, name) VALUES (null, ?) RETURNING *')
        .bind(createResult.name).first<Rival>();
    return Response.json(result)
}