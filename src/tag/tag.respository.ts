import { Repository } from "../shared/repository.js";
import { Tag } from "./tag.js";


const tags: Tag[] = [
  new Tag (
    'Cine', 'Actividad que incluye arte audiovisual', 'Enretenimiento'
  ),
  new Tag (
    'Deportes', 'Actividad que incluye algun deporte', 'Enretenimiento'
  )
]


export class TagRepository implements Repository<Tag> {
  
  public findAll(): Tag[] | undefined {
    return tags
  }

  public findOne(item: { id: string; }): Tag | undefined {
    return tags.find(tag => tag.id === item.id)
  }

  public add(item: Tag): Tag | undefined {
    tags.push(item)
    return item
  }

  public update(item: Tag): Tag | undefined {
     const tagIdx = tags.findIndex(tag => tag.id === item.id)
  
    if(tagIdx !== -1) {
      tags[tagIdx] = {...tags[tagIdx], ...item}
      return tags[tagIdx]
    }
  }

  public delete(item: { id: string; }): Tag | undefined {
    const tagIdx = tags.findIndex(tag => tag.id === item.id)

    if (tagIdx !== -1){
      const deletedTag = tags[tagIdx]
      tags.splice(tagIdx, 1)
      return deletedTag
    } 
  }

}