import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


/* Método POST */
app.post('/user', async (req, res) => {

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      cpf: req.body.cpf
    }
  })

  res.status(201).json(req.body)
})


/* Método GET */
app.get('/user', async (req, res) => {

  let users = []

  if (req.query) {
    users = await prisma.user.findMany()
  } else {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
        cpf: req.query.cpf
      }
    })
  }

  res.status(200).json(users)
})

/* Método PUT */
app.put('/user/:id', async (req, res) => {
  console.log(req)
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      cpf: req.body.cpf
    }
  })

  res.status(201).json(req.body)
})

/* Método DELETE */
app.delete('/user/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ message: "Usuário deletado com sucesso!" })
})


app.listen(3000)


