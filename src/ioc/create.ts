import * as Inverse from 'inverse'

// rename make to resolve
Inverse.prototype.resolve = Inverse.prototype.make

import initKnex from 'ioc/initKnex'
import initModels from 'ioc/initModels'
import initLogger from 'ioc/initLogger'
import createServer from 'ioc/createServer'

const createIOC = () => {
  const container = new Inverse()

  container.singleton('config', () => (require('node-config-ts').config))
  container.singleton('knex', initKnex)
  container.singleton('models', initModels)
  container.singleton('logger', initLogger)

  container.bind('server', createServer)

  return container
}

export default createIOC
