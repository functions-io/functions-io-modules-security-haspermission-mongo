"use strict";

const assert = require("assert");
const moduleTest = require("../");

var context = {};
context.getConfig = function(){
    return {
        db_url : "mongodb://localhost:27017",
        db_username : "",
        db_password : "",
        db_name: "security",
        db_collection_name: "role",
        db_fieldRoleName: "_id",
        db_fieldPermissionsName : "permissions"
    };
}

var message1 = {};
message1.roles = ["papel1","papel2"];
message1.permission = "@functions-io-labs/math.sum";

moduleTest(message1, context).then(function(result){
    assert.strictEqual(result, 1);
}, function(err){
    assert.strictEqual(err, null);
})