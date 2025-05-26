import express, { NextFunction, Request, Response } from 'express'
import { tagRouter } from './tag/tag.routes.js'

const app = express()
app.use(express.json())


app.use('/api/tags', tagRouter)


app.use((_,res) => {
  res.status(404).send({message: 'Resource not found'});
  return;
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
})