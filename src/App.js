import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './styles/App.scss';

class App extends Component {
  constructor(props) {
      super(props)
      this.getQuote = this.getQuote.bind(this)
      this.state = {
          quote: '',
          author: '',
          tweetLink: '',
          color: '',
          backgroundColor: '',
          firstRender: true
      }
  }
  getQuote = () => {
      const quoteURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      fetch(quoteURL).then((response) => {
          return response.json()
      }).then((quotesObj) => {
          const randomQuote = Math.floor(Math.random() * quotesObj.quotes.length)
          const colors = ['clr1', 'clr2', 'clr3', 'clr4', 'clr5']
          const randomColor = Math.floor(Math.random() * colors.length)
          const quote = quotesObj.quotes[randomQuote].quote
          const author = quotesObj.quotes[randomQuote].author
          this.setState({
              quote,
              author,
              tweetLink: `https://twitter.com/intent/tweet?text="${quote}" ${author}`,
              color: colors[randomColor],
              backgroundColor: `bg-${colors[randomColor]}`
          })
          document.querySelector('body').setAttribute('class', this.state.backgroundColor)
      })
  }
  componentDidMount() {
      this.setState({ firstRender: false })
  }
  render() {
      if (this.state.firstRender) {
          this.getQuote()
      }
      return (
          <div id="quote-box">
              <div id="quote" className={this.state.color}>
                  <i className="fas fa-quote-left fa-2x"></i>
                      <span id="text">
                          {this.state.quote}
                      </span>
              </div>
              <div id="author" className={this.state.color}>
                  {this.state.author}
              </div>
              <div className="buttons-area">
                  <a id="tweet-quote" className={this.state.color} href={this.state.tweetLink}><i className="fab fa-twitter-square fa-3x"></i></a>
                  <button id="new-quote" className={this.state.backgroundColor} onClick={this.getQuote}>New quote</button>
              </div>
          </div>
      )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
