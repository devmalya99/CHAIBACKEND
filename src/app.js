import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


// configure cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '50mb'}))

// URL encoder configuration
app.use(express.urlencoded({limit: '50mb', extended: true}))

// to store file folder public assets
app.use(express.static('public'))

// to access and work on clients cookies
app.use(cookieParser())

export {app}

