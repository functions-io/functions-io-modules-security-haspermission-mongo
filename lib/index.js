"use strict";

const crypto = require("crypto");

module.exports = function(message, context){
    return new Promise(async function (resolve, reject){
        try {
            let config = context.getConfig();
            
            if (message.roles.indexOf(config.roleAdminName) >= 0){
                resolve(true);
            }
            else{
                context.getDataSource("security").then(function(db){
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
                    }, function(errFind){
                        reject(errFind);
                    });
                },
                function(errDataSource){
                    reject(errDataSource);
                });
            }
        }
        catch (errTry) {
            reject(errTry);
        }
    });
};