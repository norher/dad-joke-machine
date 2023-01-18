import React, { Component } from 'react';
import './Machine.css';
import Joke from './Joke.js';
import axios from 'axios';

class Machine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || "[]")
        };
    }
    static defaultProps = {
        numJokes : 10
    };
    componentDidMount() {
        if(this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes() {
        let jokes = [];
        while(jokes.length < this.props.numJokes){
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json"}
            });
            jokes.push({ text: res.data.joke, id: res.data.id, votes: 0 });
        }
        this.setState({jokes: jokes});
        window.localStorage.setItem("jokes", JSON.stringify(jokes));
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j )
            })
        )
    }


    render() {
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
                    <button className='Machine-getmore'>Get Jokes!</button>
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