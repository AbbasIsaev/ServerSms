import React, {Component} from "react";
import classes from "./ScrollButton.scss";

class ScrollButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({intervalId: intervalId});
  }

  render() {
    return (
      <button
        title='Прокрутить наверх'
        className={classes.scroll}
        onClick={() => this.scrollToTop()}
      >
        Наверх
      </button>
    );
  }
}

export default ScrollButton
