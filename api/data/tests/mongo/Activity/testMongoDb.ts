import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server'


const mongodb = new MongoMemoryServer()


module.exports.connect = async () =>{
    await mongodb.start()
    const uri = mongodb.getUri()
    const mongooseOpts: mongoose.ConnectOptions = {
      };
    await mongoose.connect(uri,mongooseOpts)
}

module.exports.closeDatabase =async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongodb.stop()
}

module.exports.clearDatabase = async () =>{
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}