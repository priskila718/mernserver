const User=require('./model/userSchema');
const resolvers={
    Query:{
        getUsers:async(_,{id})=>{
            return await User.findById(id)
        }
    },
    Mutation:{
        createUser:async(_,{input})=>{
            try{
            const{name,email,password}=input;
            if(!name || !email || !password){
                throw new Error('Entter all the fields')
            }
            const newUser=new User({name,email,password});
            return await newUser.save();
        }catch(err){
            throw Error(err);
        }
        },
        changePass:async(_,{password})=>{
            try{
                 const userNew=await User.findByIdAndUpdate(id,{password:password},{new:true});
                 if(!newUser){
                    throw new Error('User not found');
                 }
                 return newUser;
            }
            catch(err){ throw Error(err); }
        },
    },
    User:{
        email:(parent)=>parent.email || '',
        name:(parent)=>parent.name || '',
        password:(parent)=>parent.password || ''
    }
}