import express, { response } from "express"
import { createUserValidationSchema } from "./utils/validationSchemas.mjs"
import { validationResult,matchedData,checkSchema } from "express-validator"

const app = express()
const PORT = 3001



const users = [
    { id: 1, user_name: "Goms" },
    { id: 2, user_name: "siva" },
    { id: 3, user_name: "codeio" },
    { id: 4, user_name: "sen" },
    { id: 5, user_name: "undefined" },

]
// users oda code

app.get("/users", (req, res) => {

    const { query: { filter, value } } = req
    console.log(filter, value)

    if (filter && value) {
        return res.send(
            users.filter((user) =>
                user[filter]?.toString().toLowerCase().includes(value.toLowerCase())
            )
        )
    }
    else {
        res.send(users)
    }

})


// id ku middleware use paniruken 
// const getParamsId = (req, res, next) => {

//     const id = parseInt(req.params.id)

//     if (isNaN(id)) {
//         return res.status(400).send({
//             msg: "bad request, invalid id"
//         })
//     }

//     req.id = id

//     next()
// }

const products =[
    {id:1,product_name:"iphone16"},
    {id:2,product_name:"iphone17"},
    {id:3,product_name:"s25 ultra"},
    {id:4,product_name:"s24 plus"},
   
]


// index ku middleware use paniruken 
const getUserIndexById=(req,res,next)=>{
     const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(404).send({ msg: "bad request,invalid id" })
    }

    const userIndex = users.findIndex((user) => user.id === id)   

   if(userIndex=== -1){
     return res.status(404).send({ msg: "user not found" })
   }
   req.userIndex=userIndex;
   next();

}

const getParamsId=(req,res,next)=>{
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(404).send({ msg: "bad request,invalid id" })
    }
    req.id=id
    next()

}




// products oda code
app.get("/products", (req, res) => {

    const { query: { filter, value } } = req
    console.log(filter, value)

    if (filter && value) {
        return res.send(
            products.filter((product) =>
                product[filter]?.toString().toLowerCase().includes(value.toLowerCase())
            )
        )
    }
    else {
        return res.send(products)
    }

})

app.get("/products/:id",getParamsId, (req, res) => {
    const id=req.id
    


    if (isNaN(id)) {
        return res.status(400).send({ msg: "bad request, invalid id" })
    }

    const product = products.find((product) => product.id === id)

    if (product) {
        return res.send(product)
    }

    return res.status(404).send({ msg: "product not found" })
})


// express response code
app.get("/", (req, res) => {
    res.send({ msg: "Vanakkam raaa maplaaaaaa.!" })
})


app.use(express.json()) // middleware use pannanum yen nah,json format la kudukura naala middleware use pandrom.
app.post("/users",checkSchema(createUserValidationSchema), (req, res) => {
    const result = validationResult(req)
    console.log(result)
    // console.log(req['express-validator#contexts'])
    const {body}=req
    const newUser={id:users[users.length-1].id+1,...body}
    users.push(newUser)
    return res.status(201).send(newUser)
})
 

// PUT-complete update
app.put("/users/:id",getUserIndexById,(req,res)=>{
    
   const userIndex=req.userIndex

   const{body}=req
   users[userIndex]={id:id,...body}
   return res.status(200).send({msg:"user updated"})

   
    
})



//  PATCH REQ
app.patch("/users/:id",getUserIndexById,(req,res)=>{
     

   const userIndex=req.userIndex
   const{body}=req
   users[userIndex]={...users[userIndex], ...body}
   return response.sendStatus(200)

})

// delete
app.delete("/users/:id",(req,res)=>{
   const userIndex = req.userIndex
   console.log(userIndex)
   users.splice(userIndex,1)
   res.sendStatus(200)
    
})
  





app.listen(PORT, () => {
        console.log(`App is running on port: http://localhost:${PORT}`)

})  






// localhost:3001/users?filter=user_name&value=go   
// http://localhost:3001/products?filter=product_name&value=ip  