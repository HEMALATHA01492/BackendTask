const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// // middleware
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("<h1>welcome!</h1>")

})

//End point for create Folder,text file,write content

app.get('/filesystem/createFile',(req,res)=>{

//create Folder folder name-filesystem
const folderName='C:/Users/Dell/Desktop/reactclass-BE/filesystem';
try{
    if(!fs.existsSync(folderName))
    {fs.mkdirSync(folderName)}
        let a=new Date();
        let year=(a.getFullYear());
        let month=(a.getMonth()+1);
        let date=(a.getDate());
        let hour=(a.getHours());
        let minutes=(a.getMinutes());
        let seconds=(a.getSeconds());
        let milliseconds=(a.getMilliseconds());
        let filename=`${year}${month}${date}_${hour}${minutes}${seconds}`;
        let content=`Current Time is: ${hour} hour: ${minutes} min: ${seconds} sec :${milliseconds} millisec`;
        // console.log(a);
        // console.log(filename);
        // console.log(content);
        
//create a text file, filename-current date_time.txt
       fs.writeFile(`C:/Users/Dell/Desktop/reactclass-BE/filesystem/${filename}.txt`,`${content}`,{flag:'w+'},err => {
        if(err)
        {console.error(err);}
        // file is written successfully
        console.log('File created and contents written to the file!');
        res.status(200).json({Created_file_Details:`${filename}.txt created successfully,content of the file is:${content}`})
       })
    }
catch(error){
    console.log('Folder already created',error);
}

});

//End point to get all TEXT FILES in filesystem FOLDER

app.get('/filesystem/allTextFile',(req,res)=>{

const files=fs.readdirSync('C:/Users/Dell/Desktop/reactclass-BE/filesystem')
    // console.log(files)
    let fileArray=[];
    files.forEach(file=>{
       const resolvedPath=path.resolve(file);
        // console.log(resolvedPath)
        let fileExtension=(path.extname(resolvedPath))
        if(fileExtension==='.txt'){
        // console.log(file)
            fileArray.push(file)
        }else{return}
    })      
   console.log(fileArray)

 res.status(200).json({ALL_Text_file_Details:`${fileArray}`})

})

//End point to get ALL FILES in filesystem FOLDER

app.get('/filesystem/allFiles',(req,res)=>{

    const files=fs.readdirSync('C:/Users/Dell/Desktop/reactclass-BE/filesystem')
    // console.log(files)
      let fileArrays=[];
     files.forEach(file=>{fileArrays.push(file)})
     console.log(fileArrays)  
     res.status(200).json({All_FileDetails:`${fileArrays}`})

})

//End point to read the CONTENT OF THE Particular File in that folder
app.get('/filesystem/:name',(req,res)=>{
    const namevalue=req.params.name
    // console.log(namevalue)

    fs.readFile(`C:/Users/Dell/Desktop/reactclass-BE/filesystem/${namevalue}`,'utf-8', (err, data) => {
        if(err){
            console.error(err);
            return;
        }
        let content_of_the_File=data;
        res.status(200).json({FileConentDetails:`${content_of_the_File}`})
});
});



const PORT = 3007;
app.listen(PORT,()=>{
    console.log(`server listening on PORT ${PORT}`)
})


