import { gql, useQuery } from '@apollo/client'
import { Accordion, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import FiltersItem from './FiltersItem'
import { v4 as uuidv4 } from 'uuid';
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useActiveFilters } from '../../hooks/useActiveFilters'
import { useSubcategoryParameters } from '../../hooks/useSubcategoryParameters'
import { resetFilters } from '../../redux/slices/filtrationSlice'

const SUBCATEGORY_QUERY = gql`
  query subcategory($id: String!) {
    subcategory(id: $id) {
      products {
        parameters {
          parameter {
            name
            type
          }
          value
        }
      }
    }
  }
`

const Filters = () => {

  const router = useRouter()
  const { id } = router.query

  const filters = useAppSelector(state => state.filtration.filters)

  const { loading, error, data } = useQuery(SUBCATEGORY_QUERY, { variables: { id } })
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  const parameters = useSubcategoryParameters(data.subcategory.products)

  const activeFiltersIndexes = useActiveFilters(parameters, filters)

  const dispatch = useAppDispatch()

  return (
    <div>
      <Accordion allowMultiple defaultIndex={activeFiltersIndexes}>
        {parameters.map(parameter => <FiltersItem key={uuidv4()} parameter={parameter}/>)}
      </Accordion>
      <button className='w-full | py-1 px-2 | transition-all rounded text-white bg-red-600 hover:bg-red-400' onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  )
}

export default Filters