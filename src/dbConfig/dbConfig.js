import mongoose from "mongoose";

export async function connect() {
    try {
        // Add your database name here
        mongoose.connect('mongodb+srv://DeveloperTest:Developer2022DD@cluster0.puyhapm.mongodb.net/alpha?retryWrites=true&w=majority');
        // await mongoose.connect('mongodb+srv://user1:es3IBLzvKSdMdRZh@cluster0.3cxsnbc.mongodb.net/alpha?retryWrites=true&w=majority', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDb Connected Successfully");
        });
        connection.on('error', (err) => {
            console.log("Connection Error", err.message);
            process.exit();
        });
    } catch (error) {
        console.log("Something went wrong", error.message);
    }
}
