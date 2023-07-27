const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).end("welcome!")

})

app.get("/node/filesystem",(req,res)=>{


    // create a new folder
const fs = require('fs/promises');
const path = require('path');

// const dirname='C:/Users/Dell/Desktop/reactclass-BE/nodejs/';
const folderName = `C:/Users/Dell/Desktop/reactclass-BE/filesystem`;

try {
    if(!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
        let a=new Date();
        let year=(a.getFullYear());
        let month=(a.getMonth()+1);
        let date=(a.getDate());
        let hour=(a.getHours());
        let minutes=(a.getMinutes());
        let seconds=(a.getSeconds());
        let milliseconds=(a.getMilliseconds());
        let fileName=`${year}${month}${date}-${hour}:${minutes}:${seconds}`
        let content=`Current Time is: ${hour} hour: ${minutes} min: ${seconds} sec :${milliseconds} millisec`
        // console.log(a);
        // console.log(fileName);
        // console.log(content);
          
        fs.writeFile(`C:/Users/Dell/Desktop/reactclass-BE/filesystem/${fileName}.txt`,content, {flag: 'a+'}, err => {
                if(err){
                    console.error(err);
                    return;
                }
            //     // file is written successfully
                console.log('contents written to the file!');
            })
       }
} catch(error){
    console.error("filesystem already exist",error);
}

// // const dateTimeFormat = 'YYYY-MM-DD_HH-mm-ss';


// //     try
// //   {  fs.mkdir(`${dirname}/${foldername}`,(err)=>{

// //          const content = new Date().toTimeString();
// //          const fileName = `${format(dateTimeFormat)}.txt`;
         
// //         if(err) {throw err};
    
// //         fs.writeFile(`${dirname}/${foldername}/${fileName}`,content,(err)=>
// //         {
           
// //             if(err) {throw err};
// //             res.status(200).send(`${fileName}   ---new file created`)
// //         })
// //     })}
// //     catch (err){res.status(500).send(err)}

// // })

// // app.get("/readfile/:name",(req,res)=>{

// //     const foldername = req.params.name;
// //     const fileName = req.query.filename;
   
    
    
// //         try
// //       {  
// //         fs.readFile(`${dirname}/${foldername}/${fileName}`,'utf8',(err,data)=>{
// //             if(err) {throw err}
// //             res.status(200).send(data)
        
// //         })
// //     }
// //         catch (err){res.status(500).send(err)}
    
    })




const PORT = 3002;
app.listen(PORT,()=>{
    console.log(`server listening on PORT ${PORT}`)
});