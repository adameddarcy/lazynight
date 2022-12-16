const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

// We don't pass a file name here because we don't want to store
// anything on disk
const db = connect();

async function prepare() {
    await db.query(sql`
    CREATE TABLE users (
      id VARCHAR NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      pw VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      cdetails INT,
      isadmin INT
    );
  `);

    await db.query(sql`
    CREATE TABLE feedback (
      user VARCHAR NOT NULL,
      msg VARCHAR NOT NULL,
      sender VARCHAR NOT NULL
    );
  `);
    await db.query(sql`
        INSERT INTO feedback values ('john.ball', 'Thanks for all your hard work John!', 'shane.buffy'),('kat.black', 'WOW go team!', 'john.ball');
  `);
}
const prepared = prepare();

async function set(username, pw, email, cdetails, isadmin) {
    const id = `id-${username}`
    await prepared;
    await db.query(sql`
    INSERT INTO users (id, username, pw, email, cdetails, isadmin)
      VALUES (${id}, ${username}, ${pw}, ${email}, ${cdetails}, ${isadmin})
    ON CONFLICT (id) DO UPDATE
      SET username=excluded.username;
  `);
}

async function get() {
    await prepared;
    const results = await db.query(sql`
    SELECT * FROM users;
  `);
    if (results.length) {
        return results
    } else {
        return undefined;
    }
}

async function remove(id) {
    await prepared;
    await db.query(sql`
    DELETE FROM users WHERE id=${id};
  `);
}

async function run() {
    await set('Shane.Buffy'.toLowerCase(), 'password', 'shaneB\@lazynight.com', 11223344);
    await set('Caleb.Boe'.toLowerCase(), '1234', 'Caleb\@lazynight.com', 88776655);
    await set('Brian.Corrugated'.toLowerCase(), 'ironbru', 'brianC\@lazynight.com', 11998822);
    await set('sean.ciara'.toLowerCase(), 'havoc', 'sean.c\@lazynight.com', 11445522);
    await set('admin'.toLowerCase(), 'admin1234', 'admin\@lazynightadmin.com', 10203040, 1);
}
run().catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});


const express = require('express')
const app = express()
const port = 3005

// We don't pass a file name here because we don't want to store
// anything on disk

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/login', (req, res) => {

    async function get() {
        await prepared;
        const user = req.query.user.toLowerCase();
        const pw = req.query.password.toLowerCase();
        let query = 'SELECT username, isadmin FROM users WHERE username="' + user + '" AND pw="' + pw + '";';
        console.log(query)
        const results = await db.query(sql(query));
        console.log(results)
        if (results.length) {
            res.send({body: results, status: 200})
        } else {
            res.send({status: 401});
        }
    }

    async function run() {
        await get();
    }
    run().catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
})

app.get('/getUser', (req, res) => {

    async function get() {
        await prepared;
        const user = req.query.user.toLowerCase();
        let query = 'SELECT * FROM users WHERE username="'+user+'";';
        const results = await db.query(sql(query));
        console.log(results)
        if (results.length) {
            res.send({body: results, status: 200})
        } else {
            res.send({status: 401});
        }
    }

    async function run() {
        await get();
    }
    run().catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
})

app.get('/getFeedback', (req, res) => {

    async function get() {
        await prepared;
        let query = 'SELECT * FROM feedback';
        const results = await db.query(sql(query));
        res.send(results)
    }

    async function run() {
        await get();
    }
    run().catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
})

app.get('/sendFeedback', (req, res) => {

    async function get() {
        await prepared;
        const from = req.query.from.toLowerCase();
        const msg = req.query.msg.toLowerCase();
        const sender = req.query.sender.toLowerCase();
        let query = 'INSERT INTO feedback(user, msg, sender) values '+'("'+sender+'","'+msg+'","'+from+'");';
        console.log(query)

        await db.query(sql(query));

        res.send(200)
    }

    async function run() {
        await get();
    }
    run().catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
