const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === "GET") {
        fs.readFile('calculator.html', function (err, data) {
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
            const calculate = qs.parse(data);
            fs.readFile('result.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err.message);
                }
                let number1 =calculate.number1;
                let number2 = calculate.number2;
                let calculation = calculate.calculation;
                let result = eval(number1 + calculation + number2)
                datahtml = datahtml.replace('{result}', result);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});