const db = require('./handler');

/**
 * Gets the prefix with the specified guild ID or returns `null` if none has been set. Set using the `.setPrefix()` method.
 * @param {String} guildID
 * @returns {String} String
 */
module.exports.getPrefix = (guildID) => {
    if (!guildID) {
        return db.get('defaultPrefix')
    } else {
        return db.get(`${guildID}`)
    };
};

/**
 * Sets the prefix for the specified guild ID. Can then be retrieved with the `getPrefix()` method.
 * @param {String} prefix
 * @param {String} guildID
 */
module.exports.setPrefix = (prefix, guildID) => {
    if (typeof prefix !== 'string') {
        throw new TypeError('Prefix must be of type string')
    }
    if (!prefix) {
        throw new TypeError('You must speecify a value for the prefix')
    }
    if (!guildID) {
        return db.set('defaultPrefix', prefix)
    } else {
        return db.set(`${guildID}`, prefix)
    }
};

/**
 * Get an array with every server and its corresponding prefix.
 * @returns {Array} Array
 */
module.exports.getPrefixes = () => {
    return db.all();
};

/**
 * Removes the prefix for the specified server.
 * @param {String} guildID
 */
module.exports.removePrefix = (guildID) => {
    if (!guildID) {
        return db.delete('defaultPrefix')
    } else {
        return db.delete(guildID)
    };
};