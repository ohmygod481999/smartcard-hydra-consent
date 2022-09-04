import { GraphQLClient } from 'graphql-request'
import { HASURA_ENDPOINT } from './config'

// const endpoint = "https://hasura.smartcardnp.vn/v1/graphql";
export const graphQLClient = new GraphQLClient(String(HASURA_ENDPOINT), {
  headers: {
    'content-type': 'application/json'
    // "x-hasura-admin-secret":
    //     "MJj7ZvOcOnNrca5DQBRQf6Eq5RAAUIWsWSK2ju2eBseBbffMzKrMCgeMtfM3ncKF",
  },
  timeout: 10000
})
