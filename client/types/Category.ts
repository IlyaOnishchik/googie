import { Subcategory } from "./Subcategory"

export type Category = {
  id: string
  name: string
  imageName: string
  subcategories: Subcategory[]
}