import { Parameter } from "../types/Parameter";

export const useSortedParameterValues = (parameter: Parameter): string[] => {
  switch(parameter.name) {
    case 'RAM size': return parameter.values.sort((a, b) => Number(a.split(' ')[0]) - Number(b.split(' ')[0]));
    default: return parameter.values.sort();
  }
}