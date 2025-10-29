const http =require('http')
const url=require('url')
let menu = [
  { id: 1, name: "Pizza", price: 299, available: true },
  { id: 2, name: "Burger", price: 149, available: true },
  { id: 3, name: "Pasta", price: 199, available: true }
];

const server=http.createServer((req,res)=>{
    console.log("url:"+req.url);
    const parsedUrl=url.parse(req.url,true)
    console.log(parsedUrl);
    const path=parsedUrl.pathname
    const method=req.method
    res.setHeader("Content-type","application/json")
    if(method==="GET" && path==="/menu")
  {
    res.writeHead(200);
    res.end(JSON.stringify(menu))
  }
else if(method==="GET" && path.startsWith("/menu/")){
    
    const id=parseInt(path.split("/")[2])
    const item=menu.find(item=>item.id===id)
    if(item){
        res.writeHead(200)
        res.end(JSON.stringify(item))
    }
    else{
        res.writeHead(404)
        res.end(JSON.stringify({error:"item not found"}))
    }

}

else if(method==="POST" && path==="/menu"){
    let body="";
    req.on("data",chunk=>{body+=chunk.toString()})
    req.on("end",()=>{
        const newItem=JSON.parse(body)
        newItem.id = menu.length + 1;
        menu.push(newItem) 
        res.writeHead(201)
        res.end(JSON.stringify({message:"item added","Item":newItem}))
    })

}



else if (method === "PUT" && path.startsWith("/menu/")) {
  const id = parseInt(path.split("/")[2]);
  let body = "";
  req.on("data", chunk => { body += chunk.toString(); });
  req.on("end", () => {
    const updatedData = JSON.parse(body);
    const index = menu.findIndex(m => m.id === id);
    if (index !== -1) {
      menu[index] = { ...menu[index], ...updatedData };
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Item updated", item: menu[index] }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Item not found" }));
    }
  });
}


else if(method==="DELETE" && path.startsWith("/menu/")){
  const id=parseInt(path.split("/")[2])
  const index=menu.findIndex(m=>m.id===id)
  if(index!==-1){
    const deletedData=menu.splice(index,1)
    res.writeHead(200)
    res.end(JSON.stringify({message:"item deleted",Item:deletedData[0]}))
  }
  else{
    res.writeHead(404)
    res.end(JSON.stringify({error:"item not found"}))
  }
}


// else{
//       res.writeHead(404)
//     res.end(JSON.stringify({error:"page not found"}))
// }



})
server.listen(3000,()=>{console.log("server running at port http://localhost:3000");
})

