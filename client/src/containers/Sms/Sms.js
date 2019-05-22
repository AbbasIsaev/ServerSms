import React, {Component} from 'react'
import classes from './Sms.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js"
import axios from "axios"
import Loader from "../../components/UI/Loader/Loader";

import {toast} from 'react-toastify';
import TextArea from "../../components/UI/TextArea/TextArea";
import {Enam} from '../../utils/Enam';
import {ApiUrl} from "../../ApiUrl";

class Sms extends Component {
  state = {
    isFormValid: false,
    formControls: {
      phone: {
        label: 'Телефон',
        value: '+7',
        placeholder: '+79876543210',
        type: 'text',
        errorMessage: 'Некорректный номер телефона',
        valid: false,
        touched: false,
        validation: {
          required: true,
          phone: true
        }
      },
      text: {
        label: 'Текст',
        value: '',
        placeholder: 'Введите любой текст',
        type: 'textArea',
        errorMessage: 'Введите текст',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      date: {
        label: 'Дата',
        value: '',
        type: 'date',
        errorMessage: 'Введите дату отправки',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      time: {
        label: 'Время',
        value: '',
        type: 'time',
        errorMessage: 'Введите время отправки',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      }
    },
    loading: true,
    countSms: 0
  };

  sendHandler = async () => {
    const date = this.state.formControls.date.value;
    const time = this.state.formControls.time.value.split(":");

    const dateSent = new Date(date);
    dateSent.setHours(+time[0], +time[1], 0);
    const newSms = {
      phone: this.state.formControls.phone.value,
      text: this.state.formControls.text.value,
      dateSent: dateSent
    };
    try {
      await axios.post(ApiUrl.base + "/api/sms", newSms);
      toast.success(Enam.SAVE);
    } catch (error) {
      toast.error(Enam.Error(error));
    }
  };

  submitHandler = event => {
    event.preventDefault()
  };

  onChangeHandler = (event, controlName) => {
    // Копия state
    const formControls = {...this.state.formControls};
    // Копия контрола
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value.trim(), control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      formControls,
      isFormValid
    })
  };

  validateControl(value, validation) {
    if (!validation) {
      return true
    }
    let isValid = true;
    if (validation.required) {
      isValid = value !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.phone) {
      const pattern = /^\+7[0-9]{10}$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      if (control.type === "textArea") {
        return (
          <TextArea
            key={controlName + index}
            type={control.type}
            value={control.value}
            placeholder={control.placeholder}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event, controlName)}
          />
        )
      } else
        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            placeholder={control.placeholder}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event, controlName)}
          />
        )
    });
  }

  componentDidMount() {
    axios.get(ApiUrl.base + "/api/sms/getNotSend")
      .then(response => {
        const countSms = response.data.length;
        this.setState({
          countSms
        });
      })
      .catch(error => {
        toast.error(Enam.Error(error));
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    return (
      <div className={classes.Sms}>
        <div>
          <h1>Новое SMS</h1>
          <form onSubmit={this.submitHandler} className={classes.SmsForm}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.sendHandler}
              disabled={!this.state.isFormValid}
            >
              Отправить
            </Button>
          </form>
          {this.state.loading
            ? <Loader/>
            : <p>Не отправленных: {this.state.countSms}</p>
          }
        </div>
      </div>
    )
  }

}

export default Sms
