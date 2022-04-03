const express = require("express");
const cors = require("express");
const mysql = require("mysql");
const ping = require("ping");

const app = express(); // create express object lleting me create middelewere,api and routing
app.use(cors({ origin: true }));

const db = mysql.createConnection({
  // conection to mysql
  host: "localhost",
  user: "root",
  password: "19891989",
  database: "mydb",
});

db.connect(() => {
  db.query("create table statistic (hostname char(255), count INT)", () => {});
}); // connect to my sql

app.get("/ping", async (req, res) => {
  try {
    const hostname = req.query.hostname;
    const count = +req.query.count;

    if (!hostname) {
      return res.status(400).json({ success: false, message: "hostname is required" });
    }

    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ success: false, message: "please enter valid count" });
    }

    let conenctionClose = false;
    req.on("close", () => {
      conenctionClose = true;
      res.destroy();
    });

    const pingResponse = await ping.promise.probe(hostname, { min_reply: count });

    // in case hostname no valid but we have a courrect response for ping
    if (!pingResponse.host) {
      return res.status(200).json({ success: true, data: pingResponse });
    }

    db.query(`Select count from statistic where hostname="${hostname}"`, (error, result) => {
      if (error || conenctionClose) {
        return res.status(200).json({ success: false, message: JSON.stringify(error) });
      }

      if (result.length > 0) {
        db.query(`update statistic set count=count+1 where hostname="${hostname}"`);
      } else {
        db.query(`insert into statistic (hostname,count) values("${hostname}",1)`);
      }

      res.status(200).json({ success: true, data: pingResponse });
    });
  } catch (error) {
    return { success: false, message: JSON.stringify(error) };
  }
});

app.get("/top5", (req, res) => {
  db.query(`select * from statistic order by count desc limit 5`, (error, result) => {
    if (error) {
      return res.status(400).json({ success: false, message: JSON.stringify(error) });
    }
    res.status(200).json({ success: true, data: result });
  });
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
