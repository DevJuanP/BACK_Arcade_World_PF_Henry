const server = require('./src/app.js') 
const { conn } = require('./src/db.js')

conn.sync({alter:  true})
.then(() => {
    server.listen(3001, () => {
        console.log('App listening on port 3001!');
    })
})