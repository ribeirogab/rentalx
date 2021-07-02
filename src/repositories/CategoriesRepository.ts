import { v4 as uuidV4 } from 'uuid';

import { Category } from '../model/Category';

interface IFilter {
  category: Category;
  filters: {
    id?: string;
    name?: string;
  };
}

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  private filter({ category, filters = {} }: IFilter) {
    const { id, name } = filters;

    if (id && category.id !== id) {
      return false;
    }

    if (
      name &&
      category.name.toLocaleLowerCase() !== name.toLocaleLowerCase()
    ) {
      return false;
    }

    return true;
  }

  public create({ name, description }: ICreateCategoryDTO): Category {
    const category = Object.assign(new Category(), {
      id: uuidV4(),
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }

  public findAll(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category | null {
    const foundCategory = this.categories.find(
      category => category.name.toLowerCase() === name.toLowerCase(),
    );

    return foundCategory ?? null;
  }
}
