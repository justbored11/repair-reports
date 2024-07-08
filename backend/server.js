const { app } = require("./app");
const connectDB = require("./config/dbM");
const PORT = process.env.PORT || 8000;
require("dotenv").config({ path: "./config/.env" });

async function server() {
  await connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`server runing on port ${PORT}`);
    });
  });
}

server();
