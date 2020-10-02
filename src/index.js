const express = require('express')
const app = express()
const port = 3000
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'log/combined.log' })
  ],
  defaultMeta: { service: 'user-service' },
  format: format.combine(
    // format.label({label: 'user-service'}),
    format.timestamp(),
    format.printf(info => `${info.timestamp} ${info.level} "${info.message}"`),
    format.json()
  )
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  logger.error('log error')
  logger.warn('log warn')
  logger.info('log info')
  logger.debug('log debug')
})