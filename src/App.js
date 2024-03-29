import React, { Component } from "react";

class App extends Component {
  state = {
    todos: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch("http://backend-dev222.us-east-1.elasticbeanstalk.com/api/nyu_apps/"); // fetching the data from api, before the page loaded
      const todos = await res.json();
      this.setState({
        todos,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        Loading
        {this.state.todos.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
