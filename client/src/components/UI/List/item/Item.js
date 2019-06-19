import React from 'react'
import classes from './Item.scss'

const Item = props => {
  const cls = [
    classes.Item,
    classes[props.answer.color] || classes.primary
  ];
  const date = new Date(props.answer.date);

  return (
    <li className={cls.join(' ')}>
      {props.answer.name} - {props.answer.text}
      <small>
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </small>
    </li>
  )
};

export default Item
