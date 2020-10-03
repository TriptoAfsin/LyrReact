import React, { Component } from 'react'


const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: `Search Results`,
                loading: false
            }
            default:
                return state;
    }
}

export class Provider extends Component {

    state = {
        track_list: [
            {track: {
                track_name: ''
            }},
            {track: {
                track_name: ''
            }}
        ],
        heading: '',
        loading: true,
        dispatch: action => this.setState(state => reducer(state, action))
    }


    async componentDidMount(){
        const apiKey = process.env.REACT_APP_MM_KEY;
        const cors = 'https://cors-anywhere.herokuapp.com/' //this thing is required for this api
        const url = "https://api.musixmatch.com/ws/1.1/";
        const response = await fetch(`${cors}${url}/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${apiKey}`); //asynch requires await
        const data = await response.json();
        console.log(data);
        this.setState({
            track_list: data.message.body.track_list,
            heading: 'Top 10 Tracks',
            loading: false
        })
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
