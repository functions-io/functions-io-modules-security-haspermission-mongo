"use strict";

const assert = require("assert");
const moduleTest = require("../");
const driver = require("@functions-io-modules/datasource.driver.mongo");

var context = {};
context.getConfig = function(){
    return {
        db_collection_name: "role",
        db_fieldRoleName: "_id",
        db_fieldPermissionsName : "permissions"
    };
}

context.getDataSource = function(){
    let config = {};
    config.url = "mongodb://localhost:27017";
    config.database = "security";
    return driver.getDataSource(config);
}

var message1 = {};
message1.roles = ["papel1","papel2"];
message1.permission = "@functions-io-labs/math.sum";

moduleTest(message1, context).then(function(result){
    try {
        assert.strictEqual(result, true);
    }
    finally{
        driver.close();
    }
}, function(err){
    try {
        assert.strictEqual(err, null);
    }
    finally{
        driver.close();
    }
})