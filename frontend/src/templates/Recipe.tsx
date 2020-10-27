import { graphql } from "gatsby"
import Img from "gatsby-image"
import React, { FC } from "react"
import styled from "styled-components"
import { Recipe } from "../components/RecipeList"

type Props = {
  data: {
    recipe: Recipe
  }
}

export const query = graphql`
  query($slug: String!) {
    recipe: sanityRecipe(slug: { current: { eq: $slug } }) {
      name
      id
      source
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
          fixed(width: 400, height: 400) {
            ...GatsbySanityImageFixed
          }
        }
      }
      base_ingredients
      spices
    }
  }
`

const SinglePageRecipe: FC<Props> = ({ data }) => {
  const { recipe } = data
  const {
    name,
    source,
    image,
    base_ingredients: baseIngredients,
    spices,
  } = recipe
  console.log(source)
  return (
    <RecipeGrid>
      <RecipeHeader>
        <h1 style={{ textAlign: "center" }}>{name}</h1>
        <h3>
          <a href={source}>Link to recipe →</a>
        </h3>
      </RecipeHeader>
      <RecipeImageAndIngredients>
        <Img fluid={{ ...image.asset.fluid, aspectRatio: 1 }} />
        <IngredientStyles>
          <h1>Base Ingredients</h1>
          <ul>
            {baseIngredients?.map((ingredient) => (
              <li key={ingredient}>
                <p>{ingredient}</p>
              </li>
            ))}
          </ul>
          <h1>Spices</h1>
          <ul>
            {spices?.map((spice) => (
              <li key={spice}>
                <p>{spice}</p>
              </li>
            ))}
          </ul>
        </IngredientStyles>
      </RecipeImageAndIngredients>
    </RecipeGrid>
  )
}

const RecipeGrid = styled.div`
  display: grid;
  padding: 20px;
  grid-gap: 2rem;
`

export const RecipeHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--darkGrey);
  h1 {
    font-size: 4rem;
  }
  @media screen and (min-width: 600px) {
    h1 {
      font-size: 5rem;
    }
    margin-bottom: 4rem;
  }
`

const RecipeImageAndIngredients = styled.div`
  display: inline-grid;
  grid-template-rows: minmax(100px, auto);
  .gatsby-image-wrapper {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    .gatsby-image-wrapper {
      margin-bottom: 0rem;
    }
  }
  img {
    border-radius: 1rem;
  }
`

const IngredientStyles = styled.div`
  ul {
    padding-inline-start: 0rem;
    font-size: 1.5rem;
  }
  li {
    list-style: none;
    margin-bottom: 1.5rem;
    :last-child {
      border-bottom: none;
    }
    border-bottom: 1px dashed var(--darkGrey);
  }
  @media screen and (min-width: 600px) {
    padding: 2rem 5rem;
    background: #eeeeee;
    margin: -2rem;
  }
`

export default SinglePageRecipe
