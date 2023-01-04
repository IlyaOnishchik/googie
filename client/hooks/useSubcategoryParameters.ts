import { Parameter } from "../types/Parameter"

export const useSubcategoryParameters = (products: any) => {
  const parameters: Parameter[] = []
  products.forEach(product =>
    product.parameters.forEach(productParameter => {
      const parameter = parameters.find(item => item.name === productParameter.parameter.name)
      if (!parameter) {
        const parameter: Parameter = { name: '', type: '', values: [] }
        parameter.name = productParameter.parameter.name
        parameter.type = productParameter.parameter.type
        parameter.values.push(productParameter.value)
        parameters.push(parameter)
      } else {
        if (!parameter.values.includes(productParameter.value)) parameter.values.push(productParameter.value)
      }
    })
  )
  return parameters
}