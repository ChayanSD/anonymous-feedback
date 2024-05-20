import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {}

async function connectDb():Promise<void> {
    if(connection.isConnected){
        console.log(`Database is already connected`);
        return
    }

    try{
       const db = await mongoose.connect(process.env.MONGO_URI || '',{});
       connection.isConnected = db.connections[0].readyState
       console.log(`DB connection successfully`);
       
    }catch(e){
        console.log(`DB connection failed: ${e}`)
        process.exit()
    }
}

export default connectDb;