const express=require('express')
const mongoose=require('mongoose')
const {ApolloServer,gql}=require('apollo-server-express')
const typeDefs=require('./schema')
const userApiFromRouter=require('./routes/userRoutes')
const resolvers=require('./resolves')
const port=3001
const app=express()
app.use(express.json())
const mongoURI = 'mongodb+srv://madhuridhulipudi19:g8CFQaP521fhA65p@cluster0.3kpxupq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Mongodb connected')).catch(err=>console.log(err));
const server=new ApolloServer({typeDefs,resolvers});
app.use('/users',userApiFromRouter)
async function StartServer(){
    await server.start();
    server.applyMiddleware({app});
    app.listen(port,()=>{console.log("server is live")})

}
StartServer()