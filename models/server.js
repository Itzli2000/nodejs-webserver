const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({ message: "Get Api" });
    });
    this.app.put("/api", (req, res) => {
      res.json({ message: "Put Api" });
    });
    this.app.post("/api", (req, res) => {
      res.json({ message: "Post Api" });
    });
    this.app.delete("/api", (req, res) => {
      res.json({ message: "Delete Api" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

module.exports = Server;
