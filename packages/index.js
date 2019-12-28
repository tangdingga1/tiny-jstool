'use strict';

const Store = require('./Store').default || require('./Store');
const TestType = require('./TestType').default || require('./TestType');
const ErrorCatcher = require('./ErrorCatcher').default || require('./ErrorCatcher');

module.exports = { Store, TestType, ErrorCatcher };
