import React, {Component} from 'react'
import socket from "../../socket/socket";
import List from "../../components/UI/List/List";
import ScrollButton from "../../components/UI/ScrollButton/ScrollButton";
import classes from "./Log.scss";
import {connect} from "react-redux";

class Log extends Component {
  state = {
    answers: []
  };

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.refAnswers = React.createRef();
  }

  componentWillUnmount() {
    socket.offAll();
  }

  componentDidMount() {
    socket.setJoin(this.props.user, (err, data) => {
      if (err) {
        this.addAnswer(err);
      } else {
        data.logs.map(item => {
          return this.addAnswer(item);
        });
      }
    });

    socket.getAnswer((err, message) => {
      this.addAnswer(message);
    })
  }

  addAnswer(message) {
    // Клонирование массива
    const answers = [...this.state.answers];
    answers.push({
      ...message
    });
    this.setState({
      answers
    });
    scrollToBottom(this.refAnswers);
  }

  createHandler = () => {
    const message = {
      text: "Мое сообщение click"
    };
    socket.setDate(message, (error) => {
      if (error) this.addAnswer(error);
    });
  };

  clearHandler = () => {
    const answers = {
      answers: []
    };
    this.setState(answers);
  };

  render() {
    return (
      <div className={classes.Log}>
        <div>
          <h1>Логи</h1>
          <div ref={this.refAnswers}>
            <List
              answers={this.state.answers}
            />
          </div>
        </div>

        <button
          className={classes.scroll}
          onClick={this.clearHandler}
        >
          Очистить
        </button>
        <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
      </div>
    )
  }

}

function scrollToBottom(node) {
  window.scrollTo(0, node.current.scrollHeight);
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(Log)
