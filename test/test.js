"use strict";

const assert = require("assert");
const moduleTest = require("../");

var message1 = {};
message1.roles = ["papel1","papel2"];
message1.permission = "@functions-io-labs/math.sum";

moduleTest(message1).then(function(result){
    assert.strictEqual(result, 1);
}, function(err){
    assert.strictEqual(err, null);
})