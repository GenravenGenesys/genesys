import {Armor} from "../../../src/models/equipment/Armor";
import Modifier from "../../../src/models/common/Modifier";
import Quality, {EquipmentQuality} from "../../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query = `SELECT a.*,
                          JSON_ARRAY(
                                  JSON_OBJECT('type', am.type, 'ranks', am.ranks)
                          ) AS "modifiers",
                          JSON_ARRAY(
                                  JSON_OBJECT(
                                          'quality_id', q.quality_id,
                                          'name', q.name,
                                          'description', q.description,
                                          'passive', q.passive,
                                          'cost', q.cost,
                                          'armor', q.armor,
                                          'weapon', q.weapon,
                                          'ranks', aq.ranks,
                                          'modifiers', JSON_ARRAY(
                                                  JSON_OBJECT('type', qm.type, 'ranks', qm.ranks)
                                                       )
                                  )
                          ) AS "qualities"
                   FROM ArmorQuality AS aq
                            JOIN ArmorModification am ON aq.armor_id = am.armor_id
                            JOIN QualityModification qm ON aq.quality_id = qm.quality_id
                            JOIN Quality AS q ON aq.quality_id = q.quality_id
                            JOIN Armor AS a ON aq.armor_id = a.armor_id
                   WHERE aq.armor_id = 1;`
    const armor = await context.env.GENESYS.prepare(query).bind(context.params.armor_id).first<Armor>();
    return Response.json(armor);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Armor;
    const result = await context.env.GENESYS.prepare('UPDATE Armor SET description = ?2 WHERE armor_id = ?1 RETURNING *').bind(context.params.armor_id, updatedResult.description).first<Armor>();
    return Response.json(result);
}