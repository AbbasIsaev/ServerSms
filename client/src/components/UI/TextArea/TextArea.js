import React from 'react'
import classes from './TextArea.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const TextArea = props => {
  const inputType = props.type || 'textArea';
  const cls = [classes.TextArea];
  const htmlFor = `${inputType}-${Math.random()}`;
  const placeholder = props.placeholder;

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <textarea
        id={htmlFor}
        placeholder={placeholder}
        cols="40" rows="5"
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Обязательное поле'}</span>
          : null
      }
    </div>
  )
};

export default TextArea
