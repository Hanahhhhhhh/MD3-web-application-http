const http = require('http')
const fs = require('fs')
const qs = require('qs')
let dataList = []

const port = 8080

const server = http.createServer((req, res) => {
    console.log(res)
    if (req.method === 'GET') {
        fs.readFile('./display.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            const taskInfo = qs.parse(data)
            console.log(taskInfo);
            dataList.push(taskInfo)
            fs.readFile('./todo.html', 'utf8', (err, htmlData) => {
                if (err) {
                    console.log(err)
                }
                let table = `<tr>
                            <th>Task</th>
                            <th>Time</th>
                            <th>Place</th>
                            </tr>`
                for (let i = 0; i < dataList.length; i++) {
                    table +=    `<tr>
                                <td>${dataList[i].task}</td>
                                <td>${dataList[i].time}</td>
                                <td>${dataList[i].place}</td>
                                </tr>`
                }

                htmlData = htmlData.replace(`{table data}`, table)
                console.log(htmlData);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(htmlData);
                return res.end();
            })
        })
    }
})

server.listen(8080, function () {
    console.log(`server running at http:localhost:${port} `)
})