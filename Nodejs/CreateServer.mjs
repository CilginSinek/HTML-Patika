import { createServer } from 'http';
    const port = 5000,
    server = createServer((req, res) => {
        const url = req.url;
        if(url === "/"){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h2>SAYFAMA HOŞ GELDİNİZ.</h2>");
            res.write("<p>Burası index sayfası</p>");
        } else if(url === "/hakkimda"){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h2>Hakkimda.</h2>");
            res.write("<p>Burasi da hakkımda sayfası :p </p>");
        } else if(url === "/iletisim"){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h2>İletişim.</h2>");
            res.write("<h2> Bana ulaşmak istiyorsanız bulursunuz zaten nickim sinek, bilen bilir bilmeyen öğrenir hahayt.</h2>");
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h2>BU SAYFA YOK ( YOK GIT )</h2>");
        }
        res.end();
    });
server.listen(port);