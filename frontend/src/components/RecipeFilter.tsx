import { graphql, Link, useStaticQuery } from "gatsby"
import React, { FC } from "react"
import styled from "styled-components"
import { Recipe } from "./RecipeList"

const FilterStyles = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 0.5rem;
  .count {
    display: inline-flex;
    justify-content: center;
    margin-left: 1rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    color: #193549;
  }
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const FilterTag = styled.div`
  background: #193549;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 2rem;
`

type Acc = {
  [category: string]: {
    id?: string
    name?: string
    count: number
  }
}

const countRecipesInCategory = (recipes: Recipe[]) => {
  const categoriesCount = recipes
    .map((recipe) => recipe.categories)
    .flat()
    .reduce((acc: Acc, category?: string): Acc => {
      const existingCategory = acc[category as keyof Acc]
      if (existingCategory) {
        existingCategory.count += 1
      } else {
        acc[category as keyof Acc] = {
          name: category,
          id: category,
          count: 1,
        }
      }
      return acc
    }, {})
  const sortedCategories = Object.values(categoriesCount).sort(
    (a, b) => b.count - a.count
  )
  return sortedCategories
}

type Props = {}

const RecipeFilter: FC<Props> = () => {
  const { recipes } = useStaticQuery(graphql`
    query allRecipes {
      recipes: allSanityRecipe {
        nodes {
          categories
        }
      }
    }
  `)
  console.clear()
  const categoriesWithCounts = countRecipesInCategory(recipes.nodes)
  console.log(categoriesWithCounts)
  return (
    <FilterStyles>
      <Link to="/">
        <FilterTag>
          <span>all recipes</span>
          <span className="count">{recipes.nodes.length}</span>
        </FilterTag>
      </Link>
      {categoriesWithCounts.map((category) => (
        <Link to={`/categories/${category.name}`} key={category.id}>
          <FilterTag>
            <span>{category.name}</span>
            <div className="count">
              <span>{category.count}</span>
            </div>
          </FilterTag>
        </Link>
      ))}
    </FilterStyles>
  )
}

export default RecipeFilter
