import express, { Express } from "express"
import { dataSource } from "./app-data-source"
import router from './routes/router'
import dotenv from "dotenv"

const app: Express = express()
dotenv.config()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.text())
app.use(express.static('static'))
app.use('/api', router);

async function start() {
  try {
    dataSource
          .initialize()
          .then(() => {
              console.log("Data Source has been initialized!")
          })

    app.listen(port, () => {
          console.log(`[server]: Server is running at http://localhost:${port}`);
        });

        
  } catch (error: unknown) {
  
    if (typeof error === "string") {
      console.log(error.toUpperCase())
  
    } else if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

start()