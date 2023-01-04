import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../UI/Loading'
import Error from '../UI/Error'
import ParametersItem from './ParametersItem'

const PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      price
      imageName
      parameters {
        parameter {
          name
        }
        value
      }
    }
  }
`

const Parameters = () => {

  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(PRODUCT_QUERY, { variables: { id } })
  if (loading) return <Loading/>
  if (error) return <Error error={error}/>

  return (
    <table className='flex-auto'>
      {data.product.parameters.map(item => <ParametersItem name={item.parameter.name} value={item.value}/>)}
    </table>
  )
}

export default Parameters