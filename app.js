const { createReadStream, statSync } = require("fs");
const http = require("http");
const server = http.createServer();
const port_ = process.env.PORT || "1500";
const static_ = `${__dirname}/public`;

//server
server.on("request", (req, res) => {
  //console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    createReadStream(`${static_}/index.html`).pipe(res);
  } else if (req.url === "/css/style.css") {
    res.writeHead(200, { "Content-type": "text/css" });
    createReadStream(`${static_}/css/style.css`).pipe(res);
  } else if (req.url === "/js/progressBAR_FTC.js") {
    res.writeHead(200, { "Content-type": "text/javascript" });
    createReadStream(`${static_}/js/progressBAR_FTC.js`).pipe(res);
  } else if (req.url === "/js/app.js") {
    res.writeHead(200, { "Content-type": "text/javascript" });
    createReadStream(`${static_}/js/app.js`).pipe(res);
  } else if (req.url === "/icons/settings.png") {
    res.writeHead(200, { "Content-type": "image/png" });
    createReadStream(`${static_}/icons/settings.png`).pipe(res);
  } else if (req.url === "/json/quran/surah_Index.json") {
    //const videoSizestatSync(``).size;
    const fullPTH = `${static_}/json/quran/surah_Index.json`;
    const size_ = statSync(fullPTH).size;

    res.writeHead(200, {
      "Content-type": "application/json",
      "Content-Length": size_,
    });
    createReadStream(fullPTH).pipe(res);
  } else if (req.url === "/json/quran/") {
    const mainPTH = `${req.url}${req.headers["content-local-path"]}`;
    const fullPTH = `${static_}${mainPTH}`;
    const size_ = statSync(fullPTH).size;

    res.writeHead(200, {
      "Content-type": "application/json",
      "Content-Length": size_,
    });
    createReadStream(fullPTH).pipe(res);
  } else if (req.url === "/json/hadiths/book_Name_index.json") {
    const fullPTH = `${static_}/json/hadiths/book_Name_index.json`;
    const size_ = statSync(fullPTH).size;

    res.writeHead(200, {
      "Content-type": "application/json",
      "Content-Length": size_,
    });
    createReadStream(fullPTH).pipe(res);
  } else if (req.url === "/json/hadiths/") {
    const mainPTH = `${req.url}${req.headers["content-local-path"]}`;
    const fullPTH = `${static_}${mainPTH}`;
    const size_ = statSync(fullPTH).size;

    res.writeHead(200, {
      "Content-type": "application/json",
      "Content-Length": size_,
    });
    createReadStream(fullPTH).pipe(res);
  } else {
    res.writeHead(200, { "Content-type": "text/html" });
    createReadStream(`${static_}/404.html`).pipe(res);
  }
});

server.listen(port_, () => {
  console.log(`listening on port: ${port_} | ${Date()}`);
});
