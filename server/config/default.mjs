export const config = {
  server: {
    host: '0.0.0.0',
    port: 8080,
    options: {
      ignoreTrailingSlash: true,
      onProtoPoisoning: 'remove',
      logger: {
        level: 'debug',
        prettyPrint: true
      },
      caseSensitive: false
    }
  },
  db: {
    uri: 'mongodb://localhost:27017/gardner',
    options: {
      autoCreate: true
    },
  },
  scheduler: {
    db: {
      address: 'mongodb://localhost:27017/gardner-agenda',
      collection: 'blaze'
    }
  },
  switches: [
    { name: 'Fan', pin: 19, gpioPin: 20 },
    { name: 'Humidifier', pin: 19, gpioPin: 20 },
    { name: 'Heater', pin: 19, gpioPin: 20 },
    { name: 'Heat Pad', pin: 19, gpioPin: 20 },
    { name: 'Light', pin: 19, gpioPin: 20 },
  ],
  soilMoistureSensor: {
    bus: 1,
    zeroSaturation: 2992,
    fullSaturation: 2976
  }
}

export default config
