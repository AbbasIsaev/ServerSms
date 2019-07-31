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
        {props.answer.isMobile ? <i className="fas fa-sync-alt">&nbsp;</i> : null}
        {props.answer.isAutoMobile ? <i className="fas fa-mobile-alt" aria-hidden="true">&nbsp;</i> : null}

        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </small>
    </li>
  )
};

export default Item
