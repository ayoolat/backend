const connection = require("../modules/db");

const auditTrail = () => {

}

auditTrail.logTrail = (trail) => {
    let mysql = `INSERT INTO trail(actor,action,type) 
    VALUES ('${trail.actor}', 
    '${trail.action}',
    '${trail.type}') `
    connection.query(mysql, (err, respond) => {
        if (err) {
            console.log(err)
        }
    })
}
module.exports = auditTrail