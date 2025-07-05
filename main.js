const fs = require("fs");
const fetch = require("node-fetch");
const { Canvas, loadImage } = require("skia-canvas");

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
  for (const t of ["daily","weekly","monthly","yearly"]) {
    const f = b+"/"+t+".json";
    let c = [];
    if (fs.existsSync(f)) {
      c = JSON.parse(fs.readFileSync(f,"utf8"));
    } else {
      c = Array(l[t]).fill([0,0,0]);
    }
    c.shift();
    c.push(p);
    fs.writeFileSync(f,JSON.stringify(c),"utf8");
  }
}

( async () => {

  //const r = await(await fetch(process.env.API0_URL)).text();
  //fs.writeFileSync("output.txt",r);
  const r = await(await fetch(process.env.API0_URL+"/gifts/prices",{
    headers: {
      "Authorization": "Bearer "+process.env.API0_KEY
    }
  })).json();
  for (const [n,...p] of r) {
    update_g(n,p);
  }
  fs.writeFileSync("./gifts/prices.json",JSON.stringify(r),"utf8");

  let canvas = new Canvas(1024,1024),
    ctx = canvas.getContext("2d"),
    {w,h} = canvas;
  const img = await loadImage(`https://api.changes.tg/model/HeroicHelmet/original.png`);
  ctx.drawImage(img,w*0.1,w*0.1,w*0.9,h*0.9);
  const buf = await canvas.toBuffer("image/png");
  fs.writeFileSync("gifts/prices.png",buf);

})();
