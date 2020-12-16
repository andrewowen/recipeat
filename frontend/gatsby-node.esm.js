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

const turnCategoriesIntoPages = async ({ graphql, actions }) => {
  const recipeTemplate = path.resolve("./src/pages/index.tsx")
  const { data } = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          categories
        }
      }
    }
  `)
  const { nodes: recipeNodes } = data.recipes
  const categories = recipeNodes.map((recipe) => recipe.categories).flat()
  const uniqueCategories = [...new Set(categories)]
  uniqueCategories.forEach(category => {
    console.log(`Creating a page for eaching category`, category)
    actions.createPage({
      path: `categories/${category}`,
      component: recipeTemplate,
      context: {
        category,
      }
    })
  })
}

export const createPages = async (params) => {
  console.log("CREATING PAGES...")
  await Promise.all([
    turnRecipesIntoPages(params),
    turnCategoriesIntoPages(params),
  ])
}
