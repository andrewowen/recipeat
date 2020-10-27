import path from "path"

const turnRecipesIntoPages = async ({ graphql, actions }) => {
  const recipeTemplate = path.resolve("./src/templates/Recipe.tsx")
  const { data } = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  const { nodes: recipeNodes } = data.recipes
  recipeNodes.forEach((recipe) => {
    actions.createPage({
      path: `recipe/${recipe.slug.current}`,
      component: recipeTemplate,
      context: {
        slug: recipe.slug.current,
      },
    })
  })
}

export const createPages = async (params) => {
  console.log("CREATING PAGES...")
  await Promise.all([turnRecipesIntoPages(params)])
}
