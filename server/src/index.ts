import express, { Express } from "express"
import { myDataSource } from "./app-data-source"
import router from './routes/router'
import dotenv from "dotenv"

const app: Express = express()
dotenv.config()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.static('static'))

app.use('/api', router);

async function start() {
  try {
    myDataSource
          .initialize()
          .then(() => {
              console.log("Data Source has been initialized!")
          })
          .catch((err) => {
              console.error("Error during Data Source initialization:", err)
        })

    app.listen(port, () => {
          console.log(`[server]: Server is running at http://localhost:${port}`);
        });

  } catch (error:unknown) {
    if (typeof error === "string") {
      console.log(error.toUpperCase())
    } else if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

start()