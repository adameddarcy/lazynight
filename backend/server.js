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
    await set('Shane.Buffy', 'password');
    await set('Caleb.Boe', '1234');
    await set('Brian.Corrugated', 'ironbru');
    await set('admin', 'admin1234');
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
        const results = await db.query(sql`
    SELECT * FROM users;
  `);
        if (results.length) {
            if (results[0].username.toLowerCase() === req.query.user.toLowerCase()
                && results[0].pw.toLowerCase() === req.query.password.toLowerCase()
            ) {
                res.send(200)
            } else {
                res.send(401)
            }
        } else {
            res.send(404);
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
