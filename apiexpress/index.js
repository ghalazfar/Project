const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const url = bodyParser.urlencoded({ extended: false })
const port = 2000
const mysql = require ('mysql')
const cors = require('cors')
const Crypto = require('crypto')

app.use(cors())
app.use(url)
app.use(bodyParser.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'ghalazfar',
    password: 'kronos12',
    database: 'ecommerce',
    port: 3306
})

app.get('/', (req, res) => {
    res.send('<h1>API Project!</h1>')
})

app.get('/productlist', (req, res) => {
    const { cat, catdetail } = req.query
    var sql = ``
    if (cat !== undefined) {
        if (catdetail !== undefined) {
            sql = `SELECT * 
                    FROM products
                    JOIN productcategory
                    WHERE products.idproduct = productcategory.idproduct
                    AND productcategory.idcatgroup = ${cat}
                    AND productcategory.idcatdetail = ${catdetail}
                    ORDER BY products.price;` 
        }
        else {
            sql = `SELECT * 
                        FROM products
                        JOIN productcategory
                        WHERE products.idproduct = productcategory.idproduct
                        AND productcategory.idcatgroup = ${cat}
                        ORDER BY products.price;`  
        }
        conn.query(sql, (err, data) => {
            if(err) throw err;
            res.send(data)
        })
    }             
    else {
        res.sendFile(path.join(__dirname, './index.html'));
    }    
})

app.get('/search', (req, res) => {
    const { q } = req.query
    var sql = ``
    if (q !== undefined) {
        const query = q.toUpperCase()
        sql = `SELECT * 
                FROM products
                WHERE name LIKE '%${query}%'
                ORDER BY price;`
        conn.query(sql, (err, data) => {
            if(err) throw err;
            res.send(data)
        })
    }             
    else {
        res.sendFile(path.join(__dirname, './index.html'));
    }    
})

app.get('/productdetail', (req, res) => {
    const { id } = req.query
    sql = `SELECT p.*, s.size, s.color, s.supply
                FROM products p
                JOIN productsupply s
                WHERE p.idproduct = ${id}
                AND s.idproduct = ${id};`             
    conn.query(sql, (err, data) => {
        if(err) console.log(err);
        res.send(data)
    })
})

app.post('/keeplogin', (req, res) => {
    const { email } = req.body.params
    var sqluser = `SELECT * FROM users WHERE email = '${email}';`                
    conn.query(sqluser, (err, userdata) => {
        if(err) throw err;
        res.send(userdata)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body.params
    const hashpassword = Crypto.createHmac("sha256", "abc123").update(password).digest("hex")
    var data = {
        email: email,
        hashpassword: hashpassword
    }
    var sqlget = `SELECT * FROM users WHERE email = '${email}'`
    conn.query(sqlget, data, (err, user) => {
        if (err) throw err;
        if (user.length == 0 || user[0].hashpassword !== data.hashpassword ) {
            res.send({ err: "Wrong Password or Username!" })
        }
        else {
            res.send(user)
        }
    })
})

app.post('/register', (req, res) => {
    const { username, email, password } = req.body
    var data = {
        username: username,
        email: email,
        hashpassword: Crypto.createHmac("sha256", "abc123").update(password).digest("hex"),
        status: 'regular'
    }
    var sqlget = `SELECT * FROM users WHERE username = '${username}' OR email = '${email}'` 
    conn.query(sqlget, data, (err, user) => {
        if (err) throw err;
        if (user.length == 0 ) {
            var sqlinsert = `INSERT INTO users SET ?`
            conn.query(sqlinsert, data, (err, results) => {
                if (err) throw err;
                res.send(data)
            })
        }
        else {
            res.send({ err: "Username already exist!"})
        }
    })
})

app.post('/usertransaction', (req, res) => {
    const { iduser } = req.body
    var sqlcart = `SELECT t.*, p.*
                FROM transaction t
                JOIN products p
                ON t.idproduct = p.idproduct
                WHERE iduser = '${iduser}' 
                AND status = 'cart';`
    var sqlprocess = `SELECT t.*, p.*
                    FROM transaction t
                    JOIN products p
                    ON t.idproduct = p.idproduct
                    WHERE iduser = '${iduser}' 
                    AND status = 'on process';`
    var sqldelivered = `SELECT t.*, p.*
                        FROM transaction t
                        JOIN products p
                        ON t.idproduct = p.idproduct
                        WHERE iduser = '${iduser}' 
                        AND status = 'delivered';`
    conn.query(sqlcart, (err, onCart) => {
        if(err) throw err;
        conn.query(sqlprocess, (err, onProcess) => {
            if(err) throw err;
            conn.query(sqldelivered, (err, delivered) => {
                if(err) throw err;
                res.send({ onCart, onProcess, delivered })
            })
        })
    })
})

app.post('/addtocart', (req, res) => {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const { iduser, idproduct, price, size, color, quantity } = req.body
    var data = { 
        iduser: iduser,
        idproduct: idproduct,
        payment: price,
        date: date,
        size: size,
        color: color,
        quantity: quantity,
        status: 'cart'
    }
    var sql = `INSERT INTO transaction SET ?`
    conn.query(sql, data, (err, result) => {
        if(err) res.send({err, status: 'Error'});
        else {
            console.log('success')
            res.send(result);             
        }    
    })
})

app.put('/cartquantity', (req, res) => {
    const { type, idtransaction, price } = req.body
    var sql = ''
    if (type == 'add') {
        sql = `UPDATE transaction 
                SET quantity = quantity + 1,
                payment = ${price} * quantity
                WHERE idtransaction = '${idtransaction}';`
    }
    else {
        sql = `UPDATE transaction 
                SET quantity = quantity - 1,
                payment = ${price} * quantity
                WHERE idtransaction = '${idtransaction}';`
    }
    conn.query(sql, (err, results) => {
        if(err) throw err;      
        res.send('success')
    })    
})

app.put('/deletecart', (req, res) => {
    const { idtransaction } = req.body
    var sql = `DELETE FROM transaction WHERE idtransaction = ${idtransaction};`
    conn.query(sql, (err, results) => {
        if(err) throw err;      
        res.send('success')
    })    
})

app.put('/checkout', (req, res) => {
    const { iduser } = req.body
    var sql = `UPDATE transaction 
                SET status = 'on process'
                WHERE iduser = '${iduser}'
                AND status = 'cart';`
    conn.query(sql, (err, results) => {
        if(err) throw err;      
        res.send('success')
    })    
})

app.get('/admin', (req, res) => {
    var sqlproduct = `SELECT * FROM products;`               
    var sqluser = `SELECT * FROM users;`
    var sqltransaction = `SELECT * FROM transaction;`
    conn.query(sqlproduct, (err, dataproduct) => {
        if(err) throw err;
        conn.query(sqluser, (err, datauser) => {
            if(err) throw err;
            conn.query(sqltransaction, (err, datatransaction) => {
                if(err) throw err;
            var data = { productList: dataproduct, userList: datauser, transactionList: datatransaction}
            res.send(data);     
            })       
        })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))