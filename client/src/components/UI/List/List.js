import React from 'react'
import classes from './List.scss'
import Item from './item/Item'

const List = props => (
  <ul className={classes.List}>
    {props.answers.map((answer, index) => {
      return (
        <Item
          key={index}
          answer={answer}
        />
      )
    })}
  </ul>
);

export default List
