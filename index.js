const express = require('express')
const fs  = require('fs');
const { myModel }  = require('./schema')
const app = express()
const port = 3000;
const data = require('./MOCK_DATA.json');
const {  mongoose } = require('mongoose');
app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect("mongodb://127.0.0.1:27017/testing")
 .then(()=>{console.log("Database Connected!")})
 .catch((err)=> console.log("Error in database: ",  err))

app.use(express.urlencoded({extended: false}))

/*app.get('/allUsersName', (req, res) => {
  const html = 
  
  `
    <ul>
    ${
      data.map((data)=>{
        return `<li>${data.first_name}</li>`
      })
    };
  </ul>
  `
  res.send(html);
})

app.get('/api/allUsers', (req, res) => {
    res.json(data);
  })

app.get('/mydata/:id', (req, res)=>{

})*/

/*app.get("/finduser/:id", (req, res)=>{    // params = get a object 
  const id = Number(req.params.id);    // body = body of posted data
  console.log(req.params);
  const user = data.find((user)=> user.id === id);
  console.log(user);
  return res.json(user);
})*/

/*app.post('/createUser', (req, res)=>{


  const newUser = req.body;
  const checkingUser = data.find((user)=> user.email === newUser.email)
  if(checkingUser) return res.json({status: "User is already available"});
  console.log(req.body);
  if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.gender){
    return res.json({status: "Please Provide required information!"})
  }
  data.push({...newUser, id: data.length + 1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, mydata)=>{   //stringify = convert object into JSON
    return res.json({status: "Fulfilled", id: data.length});
  })
})*/


app.get('/', (req, res)=>{
  res.send("Hello World!");
})


app.get("/findUser/:id", async (req, res)=>{
  const user = await myModel.findById(req.params.id);
  if(!user) return res.json({status: "User is not available"});
  return res.json(user);
  
})

app.post("/createUser", async (req, res)=>{
  const User = req.body;
  if(!User.first_name || !User.last_name || !User.email || !User.gender){
    return res.json({status: "Please Provide required information!"})
  }

  const userData = await myModel.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  })
  console.log(userData);
  return res.json({status: "Succeed"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})