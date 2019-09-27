/******************************************************************************
 *  Purpose:  Get data from redis cache
 *
 *  @file    getRedisToken
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/
/**
 * @param {*} token
 * @description Get token from redis cache 
 */
exports.getCacheData = (id) => {
    console.log('id==>',id)
    return new Promise((resolve, reject) => {
        client.get(id, (err, reply) => {
            if (err) {
                console.log("error getting in redis token-->", err);
                reject(err)
            }
            else {
                console.log("redis value is ==>", reply);
                resolve(reply)
            }
        })
    })
}



//    await client.get('token'+token,(err,reply)=>{
//     if(err){
//         console.log("error getting in redis token-->",err);
//     }
//     else{
//         console.log("redis value is ==>",reply);
//     }
// })

//  client.keys('*',(err,key)=>{
//     console.log('key====',key)
//  })

// await getToken.getCacheToken(req.token.payload.id)
//     .then((reply) => {
//         console.log('reply--->', reply);

//     })
//     .catch((err) => {
//         console.log('reply--->', err);
//     })

