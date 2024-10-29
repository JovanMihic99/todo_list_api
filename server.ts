import express from "express";
import { PrismaClient } from '@prisma/client'
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', async (req, res) => {
  res.json({"res": await prisma.task.findMany()});
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})