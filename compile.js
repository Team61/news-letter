const fs = require("fs");
const pug = require("pug");
const minify = require("html-minifier").minify;

const data = fs.readFileSync("data.txt", "utf8");
const messages = data.split("<>").map(message => {
  const [date, heading, body] = message.trim().split("\n").map(part => part.trim());
  return { date: new Date(date) || null, heading, body };
});

const compiler = pug.compileFile("template.pug");
const html = compiler({ messages });
const minified = minify(html, { minifyCSS: true });

fs.writeFileSync("newsletter.html", minified);
