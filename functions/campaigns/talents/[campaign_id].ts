import Talent from "../../../src/models/Talent";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    let query = `SELECT t.*,
                        JSON_ARRAY(
                                JSON_OBJECT('type', tm.type, 'ranks', tm.ranks)
                        ) AS "modifiers"
                 FROM Talent AS t
                          LEFT JOIN TalentModification tm ON t.talent_id = tm.talent_id
                          JOIN CampaignTalent ct ON ct.talent_id = t.talent_id
                 WHERE ct.campaign_id = ?;`;
    const {results} = await context.env.GENESYS.prepare(query).bind(context.params.campaign_id).all<Talent>();
    for (let talent of results) {
        if (typeof talent.modifiers === 'string') talent.modifiers = JSON.parse(talent.modifiers);
    }
    return Response.json(results);
}