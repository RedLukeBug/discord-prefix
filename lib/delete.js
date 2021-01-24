const unset = require('./lu');

module.exports = function(db, params, options) {
  
  let fetched = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
  if (!fetched) return false; // If empty, return null
  else fetched = JSON.parse(fetched.json);
  try { fetched = JSON.parse(fetched) } catch (e) {}
  
  if (typeof fetched === 'object' && params.ops.target) {
    unset(fetched, params.ops.target);
    fetched = JSON.stringify(fetched);
    db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(fetched, params.id);
    return true;
  }
  else if (params.ops.target) throw new TypeError('Target is not an object.');
  else db.prepare(`DELETE FROM ${options.table} WHERE ID = (?)`).run(params.id);
  
  return true;
}