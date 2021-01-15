var connection = require('../modules/db');
const request = require('request');
const url = require('url');
require('dotenv').config();

connection.query = util.promisify(connection.query);

exports.initiatePayment = async (req, res)=>{
    const{name, phone, email, companyID, planID} = req.body;
    const tx_ref = Date.now();

    console.log(req.body)

    resp = await connection.query(`SELECT subID, price from sub_plan where subID = ${planID}`)

    // console.log(resp)
    // if(err) throw err;

    // if(resp){
        
        let amount = resp[0].price;
        let plan = resp[0].subID;
        var options = {
            'method': 'POST',
            'url': `${process.env.PAYMENT_API_URL}/payments`,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PAYMENT_SECRET_KEY}`
            },
            body: JSON.stringify({
                "tx_ref": tx_ref,
                "amount": amount,
                "currency": "NGN",
                "redirect_url":`${process.env.db_host}/api/payment/verify-payment`,
                "payment_options":"card",
                // "payment_plan": planID,
                "customer":{
                    "email": email,
                    "phonenumber": phone,
                    "name": name
                },
                "customizations":{
                    "title":"Pace Time Sheet",
                    "description":"Time is Money",
                    "logo":"https://miro.medium.com/max/624/1*QWo6-O99AZq5sHo8BgeUBg.png"
                }
            })
        };

        request(options, function(error, response){
            if(error) return res.status(400).json(error);

            connection.query(`insert into transactions (companyID, referenceID, planID, amount, creditStatus) values('${companyID}', '${tx_ref}','${planID}','${amount}', 'pending')`, (err, resp)=>{
                if(err) throw err;

                if(resp){
                    res.status(200).json(response.body)
                }
            })
        })
    // }

}


// Payment Verification
exports.verifyPayment =(req, res)=>{
    var val = url.parse(req.url, true).query;
    const transaction_id = val.transaction_id;

    // console.log(transaction_id)

    var options = {
    'method': 'GET',
    'url': `${process.env.PAYMENT_API_URL}/transactions/${transaction_id}/verify`,
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYMENT_SECRET_KEY}`
        }
    };
    request(options, function (error, response) { 
    if (error) throw new Error(error);

    if(response){}
    console.log(response.body);
    const ans = JSON.parse(response.body);
    // console.log(transaction_id)
    const {tx_ref, amount, status} = ans.data;

    console.log(tx_ref);
    console.log(amount);
    console.log(status);

connection.query(`select amount, creditStatus from transactions where referenceID = ${tx_ref}`, (error, resp)=>{
    if(error) throw (error);

    console.log(resp)
    let paidAmount = resp[0].amount;
    let dbStatus = resp[0].creditStatus;

    // console.log(paidAmount);
    // console.log(dbStatus);

    if(amount == paidAmount && dbStatus == "pending") {
        connection.query(`update transactions set transactionID = '${transaction_id}', creditStatus = '${status}' where referenceID='${tx_ref}'`, (err, response)=>{
            if(err) throw err;

            connection.query(`SELECT companyID, duration, subID FROM sub_plan INNER JOIN transactions on sub_plan.subID = transactions.planID WHERE referenceID = '${tx_ref}'`, (error, respp)=>{
                if(error) throw error;
                let duration = respp[0].duration;
                let companyID = respp[0].companyID;
                let planID = respp[0].subID;

                connection.query(`SELECT status FROM subscription WHERE companyID = ${companyID}`, (err, resppp)=>{
                    if(err) throw err;
                    
                    if(resppp.length == 0){
                        connection.query(`INSERT INTO subscription (companyID, planID, startDate, endDate, status) VALUES ('${companyID}', '${planID}', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 30, CURRENT_TIMESTAMP), 'active')`, (err, resp)=>{
                            if(err) throw err;
                            res.send("Payment successful and Subscription activated")
                        })
                    } else{
                        if(resppp[0].status == "active"){
                            connection.query(`UPDATE subscription SET endDate = TIMESTAMPADD(DAY, 30, endDate) WHERE companyID = ${companyID}`, (err, respx)=>{
                                if(err) throw err;
                                res.send("Payment successful and Subscription activated")
                            })
                        } else{
                            connection.query(`UPDATE subscription SET startDate = CURRENT_TIMESTAMP, endDate = TIMESTAMPADD(DAY, 30, CURRENT_TIMESTAMP) WHERE companyID = ${companyID}`, (err, respy)=>{
                                if(err) throw err;
                                res.send("Payment successful and Subscription activated");
                            })
                        }
                    }
                })
            })
        })
    }
})



});

}    


