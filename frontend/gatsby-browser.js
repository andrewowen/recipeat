import React, { FC } from "react"
import { PluginOptions, WrapPageElementBrowserArgs } from "gatsby"
import Layout from "./src/components/Layout"

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
