const express = require("express");
const app = express();
const ejs = require("ejs");

app.use(express.static(__dirname + "/assets/public/"));

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);

app.get("/index", (req: any, res: any) => {
  res.render("landing", {});
});

app.get("/quiz", (req: any, res: any) => {
  res.render("quiz", {});
});

app.get("/header", (req: any, res: any) => {
  res.render("header", {});
});

app.get("/*", (req: any, res: any) => {
    var url = req.originalUrl;
    res.render("error", { url });
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port") + "/index")
);
export {};
