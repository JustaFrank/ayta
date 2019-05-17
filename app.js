const express = require('express')
const signale = require('signale')

const app = express()
const port = process.env.PORT || 6969

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', { title: 'AYTA' }))

app.listen(port, () => signale.start(`App listening on port ${port}`))
