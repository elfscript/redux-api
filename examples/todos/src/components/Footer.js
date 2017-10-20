import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filterKind="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filterKind="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filterKind="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
)

export default Footer
