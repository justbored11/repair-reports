const mongoose = require("mongoose");

//connect mongoose with mongodb connection string
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.connect_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("error a dbM.js", error);
        process.exit(1);
    }
};

module.exports = connectDB;
