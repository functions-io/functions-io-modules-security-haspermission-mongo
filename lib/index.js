"use strict";

const crypto = require("crypto");
const MongoClient = require("mongodb").MongoClient;
var client = null;

module.config = {
    db_url : "mongodb://localhost:27017",
    db_username : "",
    db_password : "",
    db_name: "security",
    db_collection_name: "role",
    db_fieldRoleName: "_id",
    db_fieldPermissionsName : "permissions",
    roleAdminName: "admin"
};

module.dispose = function(){
    if (client){
        client.close();
        client = null;
    }
}

module.exports = function(message){
    return new Promise(async function (resolve, reject){
        try {
            if (message.roles.indexOf(module.config.roleAdminName) >= 0){
                resolve(true);
            }
            else{
                if (client === null){
                    client = await MongoClient.connect(module.config.db_url, {useNewUrlParser:true});
                }
                
                let db = client.db(module.config.db_name);
                db.collection(module.config.db_collection_name).find({_id:{$in:message.roles}, permissions:[message.permission]}).count().then(function(recordCount){
                    try {
                        if (recordCount){
                            resolve(true);
                        }
                        else{
                            resolve(false);
                        }                    
                    }
                    catch (errTry2) {
                        reject(errTry2);
                    }
                });
            }
        }
        catch (errTry) {
            if (errTry.name === "MongoNetworkError"){
                module.dispose();
            }
            reject(errTry);
        }
    });
};