import React from "react";
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import './Menu-item.css'

const  MenuItem = ({
    icon, title, action, isActive = null,
  }) => (
    <button 
        className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
        onClick={action}
        title={title}>

        <svg className="remix">
          <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
        </svg>
      
    </button>



)

export default MenuItem;