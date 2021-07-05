import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category';

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Category;

  findByName(name: string): Category;

  findAll(name: string): Category[];
}
