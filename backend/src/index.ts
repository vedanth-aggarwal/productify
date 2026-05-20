import express from "express"
import {ENV} from "./config/env"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

const app = express()

app.use(cors({origin: ENV.FRONTEND_URL}))
app.use(clerkMiddleware())
// req.auth.user
app.use(express.json()) // allow json destructing
app.use(express.urlencoded({extended:true})) // html forms

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
})

app.listen(ENV.PORT, () => console.log('server listening on PORT',ENV.PORT))