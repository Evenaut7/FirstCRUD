import express, { NextFunction, Request, Response } from 'express';
import { Tag } from './tag.js';


// Declaracion De Variables
const app = express();
app.use(express.json());

const tags: Tag[] = [
  new Tag (
    'Cine', 'Actividad que incluye arte audiovisual', 'Enretenimiento'
  ),
  new Tag (
    'Deportes', 'Actividad que incluye algun deporte', 'Enretenimiento'
  )
];


// Sanitize Input
function sanitizeTagInput(req: Request, res: Response, next: NextFunction){ 

  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descipcion: req.body.descipcion,
    tipo: req.body.tipo,
  }
  //- Agregar Validaciones necesarias

  next();
}


// GetAll()
app.get('/api/tags', (req, res) => {
  res.json(tags);
});


// GetOne()
app.get('/api/tags/:id', (req, res) => {
  const aTag = tags.find(tag => tag.id === req.params.id);
  if(!aTag) res.status(404).send({message: 'Tag not found'});
  res.json(aTag);
});


// Create()
app.post('/api/tags', sanitizeTagInput, (req, res) => {
  const input = req.body
  
  const newTag = new Tag(input.nombre, input.descipcion, input.tipo);
  
  tags.push(newTag);
  res.status(201).send({message: 'Tag creado correctamente', data: newTag})
});


// Modify()
app.put('/api/tags/:id', sanitizeTagInput, (req, res) => {
  const tagIdx = tags.findIndex(tag => tag.id === req.params.id)
  
  if(tagIdx === -1) {
    res.status(404).send({message: 'Tag not found'});
  }
  
  tags[tagIdx] = {...tags[tagIdx], ...req.body.sanitizedInput}

  res.status(200).send({message: 'tag updated succesfully', data: tags[tagIdx]})
});


// Start
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});