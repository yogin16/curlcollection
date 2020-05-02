const fs = require('fs');
const path = require('path');
const dirTree = require("directory-tree");
const { CURLParser } = require('parse-curl-js')
const request = require('request');

const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname, 'build')));
const tree = dirTree(path.join(__dirname, 'curls'));

function populateContent(node) {
    if (node.type == "file") {
        fs.readFile(node.path, "utf8", function(err, content) {
            node.data = content
        })    
    }
    if (node.children) {
        node.children.forEach(element => {
            populateContent(element);
        });
    }
}

populateContent(tree)

app.get('/ping', function (req, res) {
    return res.send('pong');
});


app.get("/tree", function (req, res) {
    return res.send(tree)
})

app.post("/curl", function(req, res) {
    console.log(req.body);      // your JSON
    const cURLParser = new CURLParser(req.body.body)
    result = cURLParser.parse()
    request({
        uri: result.url,
        qs: result.query,
        method: result.method,
        headers: result.headers,
        body: JSON.stringify(result.body)
    }).pipe(res);
})

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 8080);