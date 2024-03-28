import { createServer } from "node:https";
import { createReadStream, readFileSync } from "node:fs";

createServer(
  {
    key: readFileSync(new URL("./key.pem", import.meta.url)),
    cert: readFileSync(new URL("./cert.pem", import.meta.url)),
  },
  (req, res) => {
    if (req.url.includes("fetchLater")) {
      console.log("fetchLater hit");
      res.statusCode = 200;
      res.end("ok");
    } else {
      createReadStream(new URL("./index.html", import.meta.url)).pipe(res);
    }
  }
).listen(8000, () => console.log("server listen on https://localhost:8000"));
