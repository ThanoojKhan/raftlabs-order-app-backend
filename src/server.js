require("dotenv").config();
const ENV = require("./config/env");
const app = require("./app");
const { connectMongoDB, disconnectMongoDB } = require("./config/mongodb");

let server;
let isShuttingDown = false;

async function startServer() {
  try {
    await connectMongoDB();

    const port = ENV.PORT || 3000;

    server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
}

startServer();


//Graceful shutdown handler
async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    await new Promise((resolve) => {
      server.close(() => {
        console.log("HTTP server closed");
        resolve();
      });
    });
  }

  try {
    await disconnectMongoDB();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error during MongoDB shutdown:", err.message);
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);