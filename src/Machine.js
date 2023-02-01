import React, { Component } from 'react';
import './Machine.css';
import Joke from './Joke.js';
import axios from 'axios';

class Machine extends Component {
    static defaultProps = {
        numJokes : 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]"),
            loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes() {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokes){
                let res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json"}
                });
            let newJoke = res.data.joke;
            let jokeId = res.data.id;
            if (!this.seenJoke.has(newJoke)) {
                jokes.push({ text: newJoke, id: jokeId, votes: 0 });
            } else {
                console.log("FOUND A DUPLICATE");
                console.log(newJoke);
            }
        }
        this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    } catch (e) {
        alert(e);
        this.setState({ loading: false})
        }
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j )
            }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }
    handleClick(){
        this.setState({ loading: true }, this.getJokes)
    }

    render() {
        if(this.state.loading){
            return(
                <div className='Machine-spinner'>
                    <i className='far fa-8x fa-laugh fa-spin' />
                    <h1 className='Machine-Title'> Loading</h1>
                </div>
            )
        }
        return (
            <div className='Machine'>
                <div className='Machine-sidebar'>
                    <h1 className='Machine-Title'>
                        <span>Dad</span> Jokes
                    </h1>
                    <img 
                        src='https://www.maxpixel.net/static/photo/640/Comic-Funny-Emotion-Yellow-Smiley-Emoticon-Emoji-4832492.png' 
                        alt='laughing crying face'
                        height={325}
                        width={325} 
                    />
                    <button className='Machine-getmore' onClick={this.handleClick}>Get Jokes!</button>
                </div>
                <div className='Machine-Jokes'>
                    {this.state.jokes.map(j => (
                        <Joke 
                            key={j.id} 
                            votes={j.votes} 
                            text={j.text} 
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Machine;