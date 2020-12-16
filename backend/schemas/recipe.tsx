import { FaBook as icon } from 'react-icons/fa'
import { Document, RuleType } from '../@types/schemaTypes'

const RecipeSchema: Document = {
  type: 'document',
  name: 'recipe',
  title: 'Recipes',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Recipe Name',
      type: 'string',
      description: 'Name of the recipe',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'url',
      description: 'Where did this recipe come from?',
      validation: (Rule: RuleType): RuleType =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Snack', value: 'snack' },
          { title: 'Appetizer', value: 'appetizer' },
          { title: 'Dessert', value: 'dessert' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian?',
      type: 'boolean',
      description: 'Is this recipe vegetarian?',
    },
    {
      name: 'base_ingredients',
      title: 'Base Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'spices',
      title: 'Spices',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'sauce',
      title: 'Sauce',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'text' }],
    },
  ],
}

export default RecipeSchema
