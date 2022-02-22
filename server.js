const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(require("./routes"))
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT,()=>{
    console.log(`Currently listening on ${PORT}`)
})