const fetch = require("node-fetch");
const fs = require("fs");

const update_c = (c,n,m) => {
  /*if (!Array.isArray(c)) {
    c = Array(m).fill([0,0]);
  }
  if (c.length>m) {
    c = c.slice(c.length-m);
  }*/
  c.shift();
  c.push(n);
  return c;
}

const update_g = (n,p) => {
  const l = {
    daily: 144,
    weekly: 1008,
    monthly: 4320,
    yearly: 52560
  };
  const b = "./gifts/charts/"+n;
  if (!fs.existsSync(b)) {
    fs.mkdirSync(b,{ recursive: true });
  }
  for (const tf of ["daily","weekly","monthly","yearly"]) {
    const f = b+"/"+t+".json";
    let c = [];
    if (fs.existsSync(f)) {
      try {
        c = JSON.parse(fs.readFileSync(f,"utf8"));
      } catch {
        c = Array(l[t]).fill([0,0]);
      }
    } else {
      c = Array(l[t]).fill([0,0]);
    }
    c = updateCandles(c,p,l[t]);
    fs.writeFileSync(f,JSON.stringify(c),"utf8");
  }
}

/*for (const [n,...p] of r) {
  update_g(n,p);
}*/

( async () => {

  const r = await(await fetch(process.env.API0_URL)).text();
  fs.writeFileSync("output.txt",r);

})();
