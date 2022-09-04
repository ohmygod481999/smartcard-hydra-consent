import express from 'express'
import url from 'url'
import urljoin from 'url-join'
import csrf from 'csurf'
import { hydraAdmin, hydraPublic } from '../config'
import { oidcConformityMaybeFakeSession } from './stub/oidc-cert'
import { ConsentRequestSession, PublicApi } from '@oryd/hydra-client'
import { graphQLClient } from '../graphql-client'
import { gql } from 'graphql-request'

// Sets up csrf protection
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

router.get('/', async (req, res, next) => {
  const token = req.header('Authorization')
    ? String(req.header('Authorization')).replace('Bearer ', '')
    : null
  console.log(token)
  if (!token) {
    res.status(401)
    res.jsonp({
      success: false,
      data: null,
      error: 'Unauthorized'
    })
    return
  }
  console.log('runed')
  // // Parses the URL query
  // const query = url.parse(req.url, true).query

  // // The challenge is used to fetch information about the consent request from ORY hydraAdmin.
  // const token = String(query.token)

  // This section processes consent requests and either shows the consent UI or
  // accepts the consent request right away if the user has given consent to this
  // app before

  let hydraUserInfoRes

  try {
    hydraUserInfoRes = await hydraPublic.userinfo({
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (err) {
    res.status(401)
    res.jsonp({
      success: false,
      data: null,
      error: 'Unauthorized'
    })
    return
  }

  try {
    const { data: body } = hydraUserInfoRes
    // This will be called if the HTTP request was successful
    console.log(body)
    // @ts-ignore
    const { acr, aud, auth_time, iat, iss, rat, sub } = body

    const accountInfoRes = await graphQLClient.request(
      gql`
        query getAccountByOryId($ory_id: uuid!) {
          account(where: { ory_id: { _eq: $ory_id } }) {
            id
            ory_id
            email
            account_info {
              facebook
              name
              phone
              avatar
            }
          }
        }
      `,
      {
        ory_id: sub
      }
    )

    console.log(accountInfoRes);

    // need check if account exist

    res.jsonp(accountInfoRes.account[0])
    return
  } catch (err) {
    // This will handle any error that happens when making HTTP calls to hydra
    next(err)
  }

  // The consent request has now either been accepted automatically or rendered.
})
export default router
