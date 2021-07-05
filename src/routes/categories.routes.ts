import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  const category = createCategoryService.execute({ name, description });

  return res.status(201).json({ category });
});

categoriesRouter.get('/', (req, res) => {
  const categories = categoriesRepository.findAll();

  return res.json({ categories });
});

categoriesRouter.get('/:categoryName', (req, res) => {
  const { categoryName } = req.params;

  const category = categoriesRepository.findByName(categoryName);

  if (!category) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Category not found.' });
  }

  return res.json({ category });
});

export { categoriesRouter };
