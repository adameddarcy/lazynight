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
      pw VARCHAR NOT NULL
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

async function set(username, pw) {
    const id = `id-${username}`
    await prepared;
    await db.query(sql`
    INSERT INTO users (id, username, pw)
      VALUES (${id}, ${username}, ${pw})
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
    await set('Shane.Buffy'.toLowerCase(), 'password');
    await set('Caleb.Boe'.toLowerCase(), '1234');
    await set('Brian.Corrugated'.toLowerCase(), 'ironbru');
    await set('admin'.toLowerCase(), 'admin1234');
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

app.get('/login', (req, res) => {

    async function get() {
        await prepared;
        const user = req.query.user.toLowerCase();
        const pw = req.query.password.toLowerCase();
        let query = 'SELECT * FROM users WHERE username="' + user + '" AND pw="' + pw + '";';
        console.log(query)
        const results = await db.query(sql(query));
        console.log(results)
        if (results.length) {
            res.send(200)
        } else {
            res.send(401);
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
        let query = 'INSERT INTO feedback values '+'("'+from+'","'+msg+'","'+sender+'");';
        let ch = 'SELECT * from feedback'
        await db.query(sql(query));
        const result = await db.query(sql(ch));
        console.log(result)
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
