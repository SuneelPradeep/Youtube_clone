import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import videoRouter from './routes/videos.js'
import commentsRouter from './routes/comments.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
app.use(cors())
app.use(cookieParser())
const connecta = async()=>{
    try{
        let connections = await mongoose.connect(process.env.MONGO)
        console.log('connected to DB');
    //    let data = await mongoose.connection.db.collectionNames(function(error, names) {
    //         if (error) {
    //           throw new Error(error);
    //         } else {
    //           names.map(function(name) {
    //             //console.log('found collection %s', name);
    //           });
    //         }
    //       });
        // let data =  mongoose.connection.db.admin().command({
        //     listDatabases: 1,
        //   });
        //   let dbs = connections.listDatabases((err,db)=>{
        //     if(!err){
        //     //console.log('the dbs are',db);
        //     }
        //   })
        //   //console.log('the db data is',data);
    }
    catch(err){
        //console.log(err);
    }}
       

const connect = ()=>{
    mongoose.connect(process.env.MONGO).then((connections)=>
    {  console.log('connected to DB',dbs)
}).
    catch(err=>
        console.log(err)
        )
}
// connect.on('open', function() {
//     // connection established
//     new Admin(connect.db).listDatabases(function(err, result) {
//         //console.log('listDatabases succeeded',result.databases);
//         // database list stored in result.databases
//         var allDatabases = result.databases;    
//     });})

app.get('/',(req,res)=>{
    res.send('welcome to video app api')
}
)

app.use('/api/users', usersRouter)
app.use('/api/videos', videoRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/auth', authRouter)

app.use((err,req,res,next) =>{
        const status = err.status || 500;
        const message = err.message || 'something wrong with this';
        return res.status(status).json({
            status,
            success: false,
            message
        })
})

app.listen(process.env.PORT,()=>{
    // connect() ;
    connecta();
    console.log('connected to PORt',process.env.PORT);
})
