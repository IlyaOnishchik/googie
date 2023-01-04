import Link from 'next/link'
import React from 'react'

type ActionsItemProps = {
  name: string
  href: string
  icon: JSX.Element
  onClick?: () => void
}

const ActionsItem: React.FC<ActionsItemProps> = ({ name, href, icon, onClick }) => {
  return (
    <li className='px-2 py-1 rounded-xl hover:shadow-inner' onClick={onClick}>
      <Link href={href}>
        <a>
          {icon}
          <span className='hidden xs:block whitespace-nowrap'>{name}</span>
        </a>
      </Link>
    </li>
  )
}

export default ActionsItem