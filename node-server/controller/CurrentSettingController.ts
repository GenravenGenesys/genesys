import {pool} from "../config/Database.ts";

export const getCurrentSetting = async (req, res) => {
    const query = "SELECT * FROM current;";
    const result = await pool.query(query);
    res.send(result.rows[0]);
};

export const setCurrentSetting = async (req, res) => {
    const { id } = req.params;
    const selectQuery = "SELECT * FROM setting WHERE id = $1;";
    const selectValues = [id];
    const results = await pool.query(selectQuery, selectValues);
    const updateQuery = "UPDATE current SET name = $1, id = $2, magic = $3 RETURNING *;";
    const updateValues = [results.rows[0]['name'], id, results.rows[0]['magic']];
    const update = await pool.query(updateQuery, updateValues);
    res.send(update.rows[0]);
};