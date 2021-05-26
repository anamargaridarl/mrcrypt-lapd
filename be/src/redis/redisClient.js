const redis = require('redis');
const { promisify } = require('util');
const config = require('../config/env');
const client = redis.createClient(config.redis_url);

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client),
};
