import { Filter } from "../types/Filter"
import { Parameter } from "../types/Parameter"

export const useActiveFilters = (parameters: Parameter[], filters: Filter[]): number[] => {
  const indexedParameters = parameters.map((parameter, index) => ({ ...parameter, index }))
  const filteredParameters = indexedParameters.filter(parameter => parameter.name === filters.find(filter => filter.name === parameter.name)?.name)
  return filteredParameters.map(item => item.index)
}