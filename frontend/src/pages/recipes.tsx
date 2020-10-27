import React, { FC } from "react"
import { graphql, PageProps } from "gatsby"
import RecipeList, { Recipe } from "../components/RecipeList"
import styled from "styled-components"

export const pageQuery = graphql`
  query AllRecipes {
    recipes: allSanityRecipe {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 275, maxHeight: 275) {
              ...GatsbySanityImageFluid
            }
            fixed(width: 125, height: 125) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`

interface Props extends PageProps {
  data: {
    recipes: {
      nodes: Recipe[]
    }
  }
}

const RecipesPage: FC<Props> = ({ data, ...props }) => {
  console.log(props)
  const { nodes: recipeNodes } = data.recipes
  return (
    <>
      <RecipeHeader>
        <h1>Recipes</h1>
      </RecipeHeader>
      <RecipeList recipes={recipeNodes} />
    </>
  )
}

const RecipeHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--darkGrey);
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 600px) {
    h1 {
      font-size: 5rem;
    }
    margin-bottom: 4rem;
  }
`

export default RecipesPage
