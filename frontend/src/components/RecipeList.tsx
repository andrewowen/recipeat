import { Link } from "gatsby"
import Img, { FixedObject, FluidObject } from "gatsby-image"
import React, { FC } from "react"
import styled from "styled-components"

const RecipeGrid = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
  gap: 4rem;
  padding: 20px;
  grid-auto-rows: auto auto 100px;
  justify-content: center;
`

const RecipeStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  gap: 1rem;
  .recipeImage {
    border-radius: 20px;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.3);
  }
`

const MobileRecipe = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

const MobileRecipeStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const MobileImageStyles = styled.div`
  flex: 1;
  margin-right: 1rem;
  img {
    border-radius: 2rem;
  }
`

const MobileTitleStyles = styled.div`
  flex: 2;
`

export type Recipe = {
  id: string
  image: {
    asset: {
      fluid: FluidObject | FluidObject[]
      fixed: FixedObject
    }
  }
  name: string
  source: string
  slug?: {
    current?: string
  }
  vegetarian: boolean
  base_ingredients?: string[]
  spices?: string[]
}

type Props = {
  recipes: Recipe[]
}

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
  const { name, image, slug } = recipe
  return (
    <RecipeStyles>
      <Link to={`/recipe/${slug?.current}`}>
        <Img className="recipeImage" fluid={image.asset.fluid} alt={name} />
        <h2>{name}</h2>
      </Link>
    </RecipeStyles>
  )
}

const MobileSingleRecipe = ({ recipe }: { recipe: Recipe }) => {
  const { name, image, slug } = recipe
  return (
    <Link to={`/recipe/${slug?.current}`}>
      <MobileRecipeStyles>
        <MobileImageStyles>
          <Img className="recipeImage" fixed={image.asset.fixed} alt={name} />
        </MobileImageStyles>
        <MobileTitleStyles>
          <h2>{name}</h2>
        </MobileTitleStyles>
      </MobileRecipeStyles>
    </Link>
  )
}

const RecipeList: FC<Props> = ({ recipes }) => {
  return (
    <>
      <RecipeGrid>
        {recipes.map((recipe) => (
          <SingleRecipe key={recipe.id} recipe={recipe} />
        ))}
      </RecipeGrid>
      <MobileRecipe>
        {recipes.map((recipe) => (
          <MobileSingleRecipe key={recipe.id} recipe={recipe} />
        ))}
      </MobileRecipe>
    </>
  )
}

export default RecipeList
