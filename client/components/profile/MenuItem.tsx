import React from 'react'

type MenuItemProps = {
  name: string
  href?: string
  icon: JSX.Element
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ name, href, icon, onClick }) => {
  return (
    <li>
      <a href={href} className='flex items-center | gap-2 | hover:opacity-70 cursor-pointer' onClick={onClick}>
        {icon}
        <span>{name}</span>
      </a>
    </li>
  )
}

export default MenuItem