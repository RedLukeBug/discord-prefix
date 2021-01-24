const Database = require('better-sqlite3');
let db;

if (!db) db = new Database('./prefixes.db');

var methods = {
  fetch: require('./lib/fetch.js'),
  set: require('./lib/set.js'),
  add: require('./lib/add.js'),
  subtract: require('./lib/subtract.js'),
  push: require('./lib/push.js'),
  delete: require('./lib/delete.js'),
  has: require('./lib/has.js'),
  all: require('./lib/all.js'),
  type: require('./lib/type')
};

module.exports = { 
  fetch: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  get: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  set: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (!value && value != 0) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  add: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('add', {id: key, data: value, ops: ops || {}});
  },
  subtract: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('subtract', {id: key, data: value, ops: ops || {}});
  },
  push: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  delete: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('delete', {id: key, ops: ops || {}});
  },
  has: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  includes: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  all: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  },
  fetchAll: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  },
  type: function(key, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    return arbitrate('type', {id: key, ops: ops || {}});
  },
  table: function(tableName, options = {}) {

    if (typeof tableName !== 'string') throw new TypeError('Table name has to be a string. Need Help? Check out: discord.gg/plexidev');
    else if (tableName.includes(' ')) throw new TypeError('Table name cannot include spaces. Need Help? Check out: discord.gg/plexidev');
    this.tableName = tableName;
    
    this.fetch = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.get = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.set = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (!value && value != 0) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.add = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('add', {id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.subtract = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('subtract', {id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.push = function(key, value, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
    }
    
    this.delete = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('delete', {id: key, ops: ops || {}}, this.tableName);
    }
    
    this.has = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
    }
    
    this.includes = function(key, ops) {
      if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
      return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
    }
    
    this.fetchAll = function(ops) { 
      return arbitrate('all', {ops: ops || {}}, this.tableName);
    }
    
    this.all = function(ops) { 
      return arbitrate('all', {ops: ops || {}}, this.tableName);
    }
  }
}

function arbitrate(method, params, tableName) {
  let options = {
    table: tableName || 'json' 
  }
  db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();
  if (params.ops.target && params.ops.target[0] === '.') params.ops.target = params.ops.target.slice(1); // Remove prefix if necessary
  if (params.data && params.data === Infinity) throw new TypeError(`You cannot set Infinity into the database @ ID: ${params.id}`)
  if (params.stringify) {
    try { params.data = JSON.stringify(params.data); } catch (e) 
    { throw new TypeError(`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`); } 
  }
  if (params.id && params.id.includes('.')) {
    let unparsed = params.id.split('.');
    params.id = unparsed.shift();
    params.ops.target = unparsed.join('.');
  }
  return methods[method](db, params, options);
}
