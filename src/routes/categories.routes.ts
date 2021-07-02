import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

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

categoriesRouter.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoryExists = categoriesRepository.findByName(name);

  if (categoryExists) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Category already exists.' });
  }

  const category = categoriesRepository.create({ name, description });

  return res.status(201).json({ category });
});

export { categoriesRouter };
