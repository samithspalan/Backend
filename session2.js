const fs=require('fs');

fs.writeFile('example.txt','Hello, this is an example file.',(err)=>{
    if(err){
        console.error('Error writing file:',err);
    }
    else{
        console.log('File written successfully');
    }
});

fs.readFile('example.txt','utf8',(err,data)=>{
    if(err){
        console.error('Error reading file:',err);
    }
    else{
        console.log('File contents:',data);
    }
});
fs.appendFile('example.txt','\nThis is an appended line.',(err)=>{
    if(err){
        console.error('Error appending to file:',err);      
    }
    else{
        console.log('File appended successfully');
    }
}); 
fs.unlink('example.txt',(err)=>{
    if(err){
        console.error('Error deleting file:',err);  
    }
    else{
        console.log('File deleted successfully');
    }   
});
