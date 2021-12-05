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
    let id = req.body.id

    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    let sign = ""
    signedBy.forEach(element => {
        if(element.isSigned === true) {
            sign += element.name + " (" + element.email + ");"
        }
    });

    let mark = `<div style="color: #707070"> Created on: ${datetime}
    Signed By: ${sign.slice(0, sign.length-1)}

    Your unique certificate id is #${id}
    Digital Certificate by WriteOnce
    <br/>
    </div>
    `
    doc = mark + doc

    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();
    const signature = signer.sign(private_key, 'base64')
    console.log('Digital Signature: ', signature);
    res.send({
        text: doc,
        signature: signature
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