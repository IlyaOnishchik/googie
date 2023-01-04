import React from 'react'

type ParametersItemProps = {
  name: string
  value: string
}

const ParametersItem: React.FC<ParametersItemProps> = ({ name, value }) => {
  return (
    <tr className='border'>
      <td className='p-2 | border | text-2xl font-bold'>{name}</td>
      <td className='p-2 | border | text-xl italic'>{value}</td>
    </tr>
  )
}

export default ParametersItem