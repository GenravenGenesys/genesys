import {Armor} from "../../../src/models/equipment/Armor";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Armor').all<Armor>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Armor
    const result = await context.env.GENESYS.prepare('INSERT INTO Armor (armor_id, name) VALUES (null, ?) RETURNING *').bind(createResult.name).first<Armor>();
    return Response.json(result)
}