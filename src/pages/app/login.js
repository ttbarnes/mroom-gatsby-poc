import React, { useState } from "react"
import { navigate } from "gatsby"
import gql from 'graphql-tag'
import client from '../../apollo/client'
import { setUser } from "../../services/auth"
import { isLoggedIn } from "../../services/auth"
import Layout from "../../components/layout"

const APOLLO_QUERY = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }
`;
const APOLLO_QUERY_USER = gql`
  query signIn {
    user {
      firstName,
      lastName,
      email,
      locale
    }
  }
`;

const Login = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleSubmit = event => {
    event.preventDefault()

    client.mutate({
      mutation: APOLLO_QUERY,
      variables: {
        email,
        password
      }
    }).then(result => {
      console.log('..result ', result);
      if (result.data.signIn.accessToken) {

        localStorage.setItem('token', `Bearer ${result.data.signIn.accessToken}`);

        client.query({
          query: APOLLO_QUERY_USER,
        }).then(result => {
          const {
            firstName,
            lastName,
            email
          } = result.data.user;

          setUser({
            firstName,
            lastName,
            email
          })
          navigate(`/app/profile`);


        }).catch(catchErr => {
          console.log('catchErr ', catchErr);
        });

      }
    }).catch(err => {
      console.log('catch err ', err);
    });

  }

  if (isLoggedIn()) {
    navigate(`/app/profile`)
  }

  const handleUpdateEmail = ev => {
    setEmail(ev.target.value)
  }

  const handleUpdatePassword = ev => {
    setPassword(ev.target.value)
  }

  console.log('email ', email);
  console.log('password ', password);
  return (
    <Layout>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
        }}
      >
        <label>
          Email
          <input
            type="text"
            name="email"
            onChange={handleUpdateEmail}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={handleUpdatePassword}
          />
        </label>

        <input type="submit" value="Log In" />

      </form>
    </Layout>
  )
}

export default Login
