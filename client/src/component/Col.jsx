import React from 'react'

const Col = ({ isOver, children }) => {
  const className = isOver? ' highlight-region' : '' // dragging 
  return (
    <div className={`col${className}`}> 
      {children}
    </div>
  )
}

export default Col