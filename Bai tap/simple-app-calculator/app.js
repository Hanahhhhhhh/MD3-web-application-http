const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("./calculator.html", function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        let data = '';
        req.on('data',chunk =>{
            data += chunk

        })
        req.on('end', ()=>{
            const currentMath = qs.parse(data);
            console.log(eval(currentMath.math));
            fs.readFile("./calculator.html",'utf8', (err,htmlData)=>{
                htmlData = htmlData.replace('{result}', eval(currentMath.math))
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(htmlData)
                return res.end();
            });
        })
        req.on('error', ()=>{
            console.log("error")
        })
    }
})

server.listen(8080, () => {
    console.log('server running at localhost:8080 ')
})