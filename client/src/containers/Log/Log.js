import React, {Component} from 'react'
import socket from "../../socket/socket";
import List from "../../components/UI/List/List";
import ScrollButton from "../../components/UI/ScrollButton/ScrollButton";
import classes from "./Log.scss";

class Log extends Component {
  state = {
    answers: [],
    user: {
      id: null,
      name: 'Dragon',
      room: 'Main'
    }
  };

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.refAnswers = React.createRef();
  }

  componentDidMount() {
    socket.setJoin(this.state.user, (err, data) => {
      if (err) {
        this.addAnswer(err);
      } else {
        const user = {...this.state.user};
        user.id = data.userId;
        this.setState({
          user
        });

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
    answers.push({text: JSON.stringify(message)});
    this.setState({
      answers
    });
    scrollToBottom(this.refAnswers);
  }

  createHandler = () => {
    const message = {
      id: this.state.user.id,
      text: "Мое сообщение click"
    };
    socket.setDate(message, (error) => {
      if (error) this.addAnswer(error);
    });
  };

  render() {
    return (
      <div className={classes.Log}>
        <div>
          <h1>Лог</h1>
          <div ref={this.refAnswers}>
            <List
              answers={this.state.answers}
            />
          </div>
        </div>

        <button
          className={classes.scroll}
          onClick={this.createHandler}
        >
          Добавить
        </button>
        <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
      </div>
    )
  }

}

function scrollToBottom(node) {
  window.scrollTo(0, node.current.scrollHeight);
}

export default Log
