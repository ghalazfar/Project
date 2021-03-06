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
    user: 'root',
    password: 'kronos12',
    database: 'ecommerce',
    port: 3306
})

app.get('/', (req, res) => {
    res.send('<h1>API Project!</h1>')
})

app.get('/home', (req, res) => {
    var sql = `SELECT * FROM carousel`
    conn.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data)
    })    
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
    var sql = `SELECT p.*, s.size, s.color, s.supply
                FROM products p
                JOIN productsupply s
                WHERE p.idproduct = ${id}
                AND s.idproduct = ${id};`             
    conn.query(sql, (err, detail) => {
        if(err) console.log(err);
        sqlimage = `SELECT * 
                FROM productimages
                WHERE idproduct = ${id};`
        conn.query(sqlimage, (err, images) => {
            if(err) console.log(err)
            res.send({ detail, images })
        })
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
                AND status = 'cart'
                ORDER BY t.date;`
    var sqlprocess = `SELECT t.*, p.*
                    FROM transaction t
                    JOIN products p
                    ON t.idproduct = p.idproduct
                    WHERE iduser = '${iduser}' 
                    AND status = 'on process'
                    ORDER BY t.date;`
    var sqldelivered = `SELECT t.*, p.*
                        FROM transaction t
                        JOIN products p
                        ON t.idproduct = p.idproduct
                        WHERE iduser = '${iduser}' 
                        AND status = 'delivered'
                        ORDER BY t.date;`
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
    var topidproduct = `SELECT MAX(idproduct) as top FROM products`
    conn.query(sqlproduct, (err, dataproduct) => {
        if(err) throw err;
        conn.query(sqluser, (err, datauser) => {
            if(err) throw err;
            conn.query(sqltransaction, (err, datatransaction) => {
                if(err) throw err;
                conn.query(topidproduct, (err, topidproduct) => {
                    if(err) throw err;
                    var data = { productList: dataproduct, userList: datauser, transactionList: datatransaction, topidproduct: topidproduct}
                    res.send(data);     
                })  
            })             
        })
    })
})

app.post('/adminproductdetails', (req, res) => {
    const { id } = req.body
    var sql = `SELECT *
                FROM productimages
                WHERE idproduct = ${id};`             
    conn.query(sql, (err, images) => {
        if(err) console.log(err);
        sql = `SELECT idcatgroup, idcatdetail
                FROM productcategory
                WHERE idproduct = ${id};`  
        conn.query(sql, (err, category) => {
            if(err) console.log(err);
            res.send({ images, category })       
        })     
    })
})

app.post('/product', (req, res) => {
    const { 
        idproduct,
        name,
        price,
        description,
        thumbnail,
        discount,
        idcatgroup,
        idcatdetail,
        image1,
        image2,
        image3,
        image4
    } = req.body
    const productdata = {
        name,
        price,
        description,
        thumbnail,
        discount,
    }
    const catdata = {
        idproduct, 
        idcatgroup,
        idcatdetail
    }
    const imagedata = { 
        idproduct, 
        image1,
        image2,
        image3,
        image4
    }
    var sql = `INSERT INTO products SET ?`
    conn.query(sql, productdata, (err, data) => {
        if(err) throw err;
        sql = `INSERT INTO productcategory SET ?`
        conn.query(sql, catdata, (err, data) => {
            if(err) throw err;
            sql = `INSERT INTO productimages SET ?`
            conn.query(sql, imagedata, (err, data) => {
                if(err) throw err;
                else {
                    sql = `SELECT * FROM products;`
                    conn.query(sql, (err, dataProduct) => {
                        if(err) throw err;
                        var data = { productList: dataProduct }
                        res.send(data);            
                    })     
                } 
            })
        })           
    })
})

app.delete('/product/:id', (req, res) => {
    var sql = `DELETE FROM products WHERE idproduct = ` + req.params.id;
    conn.query(sql, (err, data) => {
        if(err) res.send({err, status: 'Error'});
        else{
            sql = `SELECT * FROM products;`
            conn.query(sql, (err, dataProduct) => {
            if(err) throw err;
            var data = { productList: dataProduct }
            res.send(data);            
            })
        }             
    })
})

app.put('/product/:idproduct', (req, res) => {
    const { name,
        price,
        description,
        thumbnail,
        discount,
        idcatgroup,
        idcatdetail,
        image1,
        image2,
        image3,
        image4
    } = req.body
    const productdata = {
        name,
        price,
        description,
        thumbnail,
        discount,
    }
    const catdata = { 
        idcatgroup,
        idcatdetail
    }
    const imagedata = { 
        image1,
        image2,
        image3,
        image4
    }
    var sql = `UPDATE products SET ? WHERE idproduct = '${req.params.idproduct}';`
    conn.query(sql, productdata, (err, data) => {
        if(err) throw err;
        sql = `UPDATE productcategory SET ? WHERE idproduct = '${req.params.idproduct}';`
        conn.query(sql, catdata, (err, data) => {
            if(err) throw err;
            sql = `UPDATE productimages SET ? WHERE idproduct = '${req.params.idproduct}';`
            conn.query(sql, imagedata, (err, data) => {
                if(err) throw err;
                sql = `SELECT * FROM products;`
                conn.query(sql, (err, dataProduct) => {
                    if(err) throw err;
                    var data = { productList: dataProduct }
                    res.send(data);            
                })     
            })
        })           
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`))