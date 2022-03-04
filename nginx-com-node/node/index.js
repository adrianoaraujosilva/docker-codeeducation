const express = require("express");
const { faker } = require('@faker-js/faker');
const mysql = require('mysql')

const app = express()
const port = 3000

const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    charset: 'utf8'
});

const sql = 'SELECT * FROM people';
let reo = "";


async function setResHtml(sql, cb) {
    reo = '<html><head><title>Nginx com Node.js</title></head><body><h1>Full Cycle Rocks!</h1>{${table}}</body></html>'
    await pool.getConnection((err, con) => {
        con.query(`INSERT INTO people(name) values('${faker.name.findName()}')`);
        con.release();
    })

    pool.getConnection((err, con) => {
        if (err) throw err;

        con.query(sql, (err, res, cols) => {
            if (err) throw err;

            var table = '';

            for (var i = 0; i < res.length; i++) {
                table += '<tr><td>' + res[i].id + '</td><td>' + res[i].name + '</td></tr>';
            }
            table = '<table border="1"><tr><th>Id</th><th>Name</th></tr>' + table + '</table>';

            con.release();

            return cb(table);
        });
    });
}

app.get('/',  (req,res) => {
    setResHtml(sql, resql => {
        reo = reo.replace('{${table}}', resql);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(reo, 'utf-8');
        res.end();
    });
})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})