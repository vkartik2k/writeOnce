const express = require('express')
const app = express()
const crypto = require('crypto');
const fs = require('fs');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(express.json())
app.use(cors(corsOptions))

const private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');

app.post("/encrypt", (req,res)=>{
    let doc = req.body.text
    let signedBy = req.body.signedBy

    let currentdate = new Date(); 
    let Datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    let sign = ""
    signedBy.forEach(element => {
        if(element.isSigned === true) {
            sign += element.email + "; "
        }
    });

    let mark = `<div style="color: #707070"> Created on: ${Datetime}<br/>
    Signed By: ${sign.slice(0, sign.length-2)}<br/>
    <br/>

    Digital Certificate by WriteOnce
    </div>
    <br/><br/>
    `
    doc = mark + doc

    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();
    const signature = signer.sign(private_key, 'base64')
    console.log('Digital Signature: ', signature);
    res.send({
        text: doc,
        signature: signature,
        signedBy: signedBy,
        timestamp: Datetime
    })
})

app.post("/verify", (req,res)=>{
    const text = req.body.text
    const signature = req.body.signature

    const public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.write(text);
    verifier.end();
    const result = verifier.verify(public_key, signature, 'base64');
    console.log(result)
    res.send({
        isVerified: result
    })
})

app.listen('5050',()=>{
    console.log("Server running at port 5050" )
})