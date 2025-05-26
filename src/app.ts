import express, { NextFunction, Request, response, Response } from 'express';
import { Tag } from './tag/tag.js';
import { TagRepository } from './tag/tag.respository.js';


// Declaracion De Variables
const app = express();
app.use(express.json());

const repository = new TagRepository;

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
  res.json(repository.findAll());
});


// GetOne()
app.get('/api/tags/:id', (req, res) => {
  const aTag = repository.findOne({id: req.params.id});
  if(!aTag) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  res.json({data: aTag});
});


// Create()
app.post('/api/tags', sanitizeTagInput, (req, res) => {
  const input = req.body
  
  const tagInput = new Tag(input.nombre, input.descipcion, input.tipo);
  
  const newTag = repository.add(tagInput);
  res.status(201).send({message: 'Tag creado correctamente', data: newTag})
});


// ModifyAll()
app.put('/api/tags/:id', sanitizeTagInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id

  const modifiedTag = repository.update(req.body.sanitizedInput)
  
  if(!modifiedTag) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  res.status(200).send({message: 'tag updated succesfully', data: modifiedTag})
});


// PartialModify()
app.patch('/api/tags/:id', sanitizeTagInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id

  const modifiedTag = repository.update(req.body.sanitizedInput)
  
  if(!modifiedTag) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  res.status(200).send({message: 'tag updated succesfully', data: modifiedTag})
});


//Delete()
app.delete('/api/tags/:id', (req, res) => {
  const deletedTag = repository.delete({id: req.params.id})

  if (!deletedTag){
    res.status(400).send({message: 'Tag not found'})
  } else {
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