import { AdminApi, Configuration, PublicApi } from '@oryd/hydra-client'
import 'dotenv/config'

const baseOptions: any = {}

if (process.env.MOCK_TLS_TERMINATION) {
  baseOptions.headers = { 'X-Forwarded-Proto': 'https' }
}

console.log("HYDRA_ADMIN_URL", process.env.HYDRA_ADMIN_URL);

const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions
  })
)

const hydraPublic = new PublicApi(
  new Configuration({
    basePath: process.env.HYDRA_PUBLIC_URL,
    baseOptions
  })
)

const KRATOS_URL = process.env.KRATOS_URL
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT

export { hydraAdmin, hydraPublic, KRATOS_URL, HASURA_ENDPOINT }
