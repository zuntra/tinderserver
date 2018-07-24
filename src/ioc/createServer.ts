import * as glue from 'glue'
import * as path from 'path'

/**
 * Create the server
 *
 * @param {object} manifest The serverconfig
 * @param {boolean} skipPtpInit Don't initialize ptp
 * @param {boolean} skipDelugeInit Don't initialize deluge
 * @param {boolean} skipModelsInit Don't initialize the models
 * @returns {Promise} Promise resolving into the hapi server object
 */
function createServer(manifest, skipPtpInit, skipDelugeInit, skipModelsInit) {
  let manifestObject = manifest
  if (manifest.util) {
    // needed as otherwise hapi errors about unknown properties like util / get
    manifestObject = manifest.util.toObject(manifest)
  }

  // add error handling
  if (!manifestObject.server.routes.validate) {
    manifestObject.server.routes.validate = {}
  }
  manifestObject.server.routes.validate.failAction = (request, h, err) => {
    // respond with the full error.
    throw err
  }

  return Promise.all([
    skipModelsInit ? Promise.resolve() : this.resolve('knex'),
  ]).then(() => (
    glue.compose(manifestObject, { relativeTo: path.resolve(__dirname, '..') })
  ))
}

export default createServer
