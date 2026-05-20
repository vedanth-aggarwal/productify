import express from "express"
import {ENV} from "./config/env"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

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

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)

app.listen(ENV.PORT, () => console.log('server listening on PORT',ENV.PORT))