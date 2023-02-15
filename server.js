const { app } = require("./app");
const connectDB = require("./config/dbM");
const PORT = 8000;
require("dotenv").config({ path: "./config/.env" });

async function server() {
    await connectDB().then(() => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`server runing on port ${PORT}`);
        });
    });
}

server();
