"use strict";

const crypto = require("crypto");
const MongoClient = require("mongodb").MongoClient;
var client = null;

module.dispose = function(){
    if (client){
        client.close();
        client = null;
    }
}

module.exports = function(message, context){
    return new Promise(async function (resolve, reject){
        try {
            let config = context.getConfig();

            if (message.roles.indexOf(config.roleAdminName) >= 0){
                resolve(true);
            }
            else{
                if (client === null){
                    client = await MongoClient.connect(config.db_url, {useNewUrlParser:true});
                }
                
                let db = client.db(config.db_name);
                db.collection(config.db_collection_name).find({_id:{$in:message.roles}, permissions:{$in:[message.permission]}}).count().then(function(recordCount){
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