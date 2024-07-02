import Modifier from "../../../../src/models/common/Modifier";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM ArmorModification WHERE armor_id = ?').bind(context.params.armor_id).all<Modifier>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Modifier
    const results = await context.env.GENESYS.prepare(`INSERT INTO ArmorModification (armor_id, type, ranks) VALUES (?1, ?2, ?3) RETURNING *`).bind(context.params.armor_id, createResult.type, createResult.ranks).first<Modifier>();
    return Response.json(results);
}