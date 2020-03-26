import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../pages/app/profile"
import LoginPage from "../pages/app/login"
import Test from "../pages/test"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <LoginPage path="/app/login" />
      <Test path="/app/test" component={Test} />
    </Router>
  </Layout>
)

export default App
