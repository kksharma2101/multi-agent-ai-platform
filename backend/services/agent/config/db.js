import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log("Error in connecting database")
    }
}

export default connectToDb;