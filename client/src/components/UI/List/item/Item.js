import React from 'react'
import classes from './Item.scss'

const Item = props => {
  return (
    <li className={classes.Item}>
      {props.answer.text}
    </li>
  )
};

export default Item
