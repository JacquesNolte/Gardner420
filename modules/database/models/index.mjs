export const models = {
  conditions: {
    referenceKey: 'conditions',
    schema: () => import('./conditions.model.mjs').then(m => m.conditionsSchema)
  },
  devices: {
    referenceKey: 'devices',
    schema: () => import('./devices.model.mjs').then(m => m.devicesSchema)
  },
  values: {
    referenceKey: 'values',
    schema: () => import('./values.model.mjs').then(m => m.valuesSchema)
  }
}

export default models
