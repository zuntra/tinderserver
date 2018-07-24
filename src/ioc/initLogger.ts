import * as path from 'path'
import * as fs from 'fs'
import * as bunyan from 'bunyan'
import * as bunyanStreamsConfig from 'bunyan-streams-config'

const root = path.resolve(path.join(__dirname, '..'))

/**
 * Init a bunyan logger
 *
 * @returns {object} The initd logger instance
 */
function initLogger() {
  // get config from ioc
  const config = this.resolve('config')

  // eslint-disable-next-line import/no-dynamic-require
  const pkg = require(path.join(root, '..', 'package'))

  // create log directory if it doesnt exist
  if (!fs.existsSync(config.bunyan.directory)) {
    fs.mkdirSync(config.bunyan.directory)
  }

  const log = bunyan.createLogger({
    name: pkg.name,
    version: pkg.version,
    src: config.bunyan.src,
    streams: bunyanStreamsConfig(config.bunyan.streams),
  })

  log.debug('Logging setup complete')
  return log
}

export default initLogger
