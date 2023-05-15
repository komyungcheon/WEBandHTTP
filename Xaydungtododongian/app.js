const http = require('http');
const fs = require('fs');
const qs = require('qs')

const array = [];
let counter = 0;
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./todo.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const todo = qs.parse(data);
            array.push(todo);
            fs.readFile('./display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err.message);
                }
                let modifiedDataHtml = datahtml;
                let  index = array.length;
                for (let i = 0; i < array.length; i++) {
                    modifiedDataHtml = modifiedDataHtml.replace("<div id=\"result\">", "<div id=\"result\">"+ '<p>' + index-- + '. ' + array[i].todo + '</p>')

                }
                counter ++

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(modifiedDataHtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(7000, function () {
    console.log('server running at localhost:7000 ')
});