import { Configuration, V0alpha2Api } from '@ory/client'
import { KRATOS_URL } from './config'

export const kratos = new V0alpha2Api(
  new Configuration({
    // basePath: 'https://compassionate-cerf-qnxuxdt63h.projects.oryapis.com'
    // basePath: '/.ory'
    basePath: KRATOS_URL
    // ""
  })
)
