const fetch = require("node-fetch");
const fs = require("fs");

( async () => {

  const r = await(await fetch(process.env.API0_URL)).text();
  fs.writeFileSync("output.txt",r);

})();
