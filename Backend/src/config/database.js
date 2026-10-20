import mongoose from "mongoose";

export async function DbConnect(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database is connected')
    })
}
