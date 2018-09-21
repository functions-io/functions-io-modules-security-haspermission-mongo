"use strict";

const moduleTest = require("../lib");

var message1 = {};
message1.roles = ["papel1","papel2"];
message1.permission = "@functions-io-labs/math.sum";
moduleTest(message1).then(function(result){
    console.log("sucess! ", result);
}, function(err){
    console.log("err! ", err);
})