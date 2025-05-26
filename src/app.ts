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

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}


// GetAll()
app.get('/api/tags', (req, res) => {
  res.json(tags);
});


// GetOne()
app.get('/api/tags/:id', (req, res) => {
  const aTag = tags.find(tag => tag.id === req.params.id);
  if(!aTag) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  res.json({data: aTag});
});


// Create()
app.post('/api/tags', sanitizeTagInput, (req, res) => {
  const input = req.body
  
  const newTag = new Tag(input.nombre, input.descipcion, input.tipo);
  
  tags.push(newTag);
  res.status(201).send({message: 'Tag creado correctamente', data: newTag})
});


// ModifyAll()
app.put('/api/tags/:id', sanitizeTagInput, (req, res) => {
  const tagIdx = tags.findIndex(tag => tag.id === req.params.id)
  
  if(tagIdx === -1) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  
  tags[tagIdx] = {...tags[tagIdx], ...req.body.sanitizedInput}

  res.status(200).send({message: 'tag updated succesfully', data: tags[tagIdx]})
});


// PartialModify()
app.patch('/api/tags/:id', sanitizeTagInput, (req, res) => {
  const tagIdx = tags.findIndex(tag => tag.id === req.params.id)
  
  if(tagIdx === -1) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  
  tags[tagIdx] = {...tags[tagIdx], ...req.body.sanitizedInput}

  res.status(200).send({message: 'tag updated succesfully', data: tags[tagIdx]})
});


//Delete()
app.delete('/api/tags/:id', (req, res) => {
  const tagIdx = tags.findIndex(tag => tag.id === req.params.id)

  if (tagIdx === -1){
    res.status(400).send({message: 'Tag not found'})
  } else {
  tags.splice(tagIdx, 1);
  res.status(200).send({message: 'Tag deleted succesfully'});
  }

});

app.use((_,res) => {
  res.status(404).send({message: 'Resource not found'});
  return;
})

// Start
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});