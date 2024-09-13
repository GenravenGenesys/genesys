import Injury from "../../src/models/Injury";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Injury').all<Injury>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Injury
    const result = await context.env.GENESYS.prepare('INSERT INTO Injury (injury_id, name) VALUES (null, ?) RETURNING *')
        .bind(createResult.name).first<Injury>();
    return Response.json(result)
}