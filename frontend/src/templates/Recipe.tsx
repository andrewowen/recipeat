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
      steps
      sauce
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
    sauce,
    steps,
  } = recipe
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
          {!!spices?.length && (
            <>
              <h1>Spices</h1>
              <ul>
                {spices?.map((spice) => (
                  <li key={spice}>
                    <p>{spice}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!!sauce?.length && (
            <>
              <h1>Sauce</h1>
              <ul>
                {sauce?.map((sauceIngredient) => (
                  <li key={sauceIngredient}>
                    <p>{sauceIngredient}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </IngredientStyles>
      </RecipeImageAndIngredients>
      <StepsContainer>
        <h1>Steps</h1>
        {!!steps?.length ? (
          <ul>
            {steps?.map((step) => (
              <Step>
                <li key={step}>
                  <p>{step}</p>
                </li>
              </Step>
            ))}
          </ul>
        ) : (
          <div>
            <p>No steps have been added yet! Add them in Sanity Studio!</p>
          </div>
        )}
      </StepsContainer>
    </RecipeGrid>
  )
}

const RecipeGrid = styled.div`
  display: grid;
  padding: 20px;
  grid-gap: 2rem;
  p {
    font-size: 1.5rem;
  }
  ul {
    font-size: 1.5rem;
    padding-inline-start: 2rem;
  }
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
  li {
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

const StepsContainer = styled.div`
  @media screen and (min-width: 600px) {
    margin-top: 2rem;
  }
`

const Step = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px dashed var(--darkGrey);
`

export default SinglePageRecipe
