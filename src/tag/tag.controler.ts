import { NextFunction, Request, Response } from 'express'
import { Tag } from './tag.js'
import { TagRepository } from './tag.respository.js'


const repository = new TagRepository


function sanitizeTagInput(req: Request, res: Response, next: NextFunction){ 

  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descipcion: req.body.descipcion,
    tipo: req.body.tipo,
  }
  //- Agregar Validaciones necesarias

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}


function findAll(req: Request, res: Response){
  res.json(repository.findAll())
}


function findOne(req: Request, res: Response){
  const aTag = repository.findOne({id: req.params.id});
  if(!aTag) {
    res.status(404).send({message: 'Tag not found'});
    return;
  }
  res.json({data: aTag})
}


function add(req: Request, res: Response) {
  const input = req.body
  
  const tagInput = new Tag(input.nombre, input.descipcion, input.tipo);
  
  const newTag = repository.add(tagInput);
  res.status(201).send({message: 'Tag creado correctamente', data: newTag})
}


function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id

  const modifiedTag = repository.update(req.body.sanitizedInput)
  
  if(!modifiedTag) {
    res.status(404).send({message: 'Tag not found'})
    return
  }
  res.status(200).send({message: 'tag updated succesfully', data: modifiedTag})
}


function remove(req: Request, res: Response) {
  const deletedTag = repository.delete({id: req.params.id})

  if (!deletedTag){
    res.status(400).send({message: 'Tag not found'})
  } else {
    res.status(200).send({message: 'Tag deleted succesfully'})
  }

}


export {sanitizeTagInput, findAll, findOne, add, update, remove}