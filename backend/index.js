const db = require('./mongo')
db.connectToMongo();

const express = require('express');
const app = express();
const port = 80;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req, res) => {
    res.send("App entry point!")
    // res.render('index.html', {useNewUrlParser   : true  });
})
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})