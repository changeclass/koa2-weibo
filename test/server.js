/**
 * @author 小康
 * @description jest server
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
