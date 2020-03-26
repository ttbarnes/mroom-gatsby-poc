import React from "react"
import Layout from "../../components/layout"
import { getUser } from "../../services/auth"

const Profile = () => {
  const fullName = `${getUser().firstName} ${getUser().lastName}`;
  return (
    <Layout>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {fullName}</li>
        <li>E-mail: {getUser().email}</li>
      </ul>
    </Layout>
  )
}

export default Profile
