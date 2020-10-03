import React, { Component } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

class Lyrics extends Component {

    state = {
        track: {

        },
        lyrics: {

        },
        loading: true
    }

    async componentDidMount(){
        const apiKey = process.env.REACT_APP_MM_KEY;
        const cors = 'https://cors-anywhere.herokuapp.com/' //this thing is required for this api
        const url = "https://api.musixmatch.com/ws/1.1/";
        const response = await fetch(`${cors}${url}/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${apiKey}`); //asynch requires await
        const response2 = await fetch(`${cors}${url}/track.get?track_id=${this.props.match.params.id}&apikey=${apiKey}`); //asynch requires await
        const data = await response.json();
        const dataTrack = await response2.json();
        console.log(data);
        console.log(dataTrack);
        this.setState({
            lyrics: data.message.body.lyrics, 
            track: dataTrack.message.body.track,
            loading: false
        })


    }

    render() {
        const {loading, track, lyrics} = this.state

        if(loading){
            return (
                <div>
                    <Spinner></Spinner>
                    <h3 className="text-center mb-4">Please Wait...</h3>
                </div>
            )
        }
        else{
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-m mb-4">Back</Link>
                     <div >
                        <h4><b>Track Name:</b> {track.track_name}</h4>
                        <h4><b>Album: </b> {track.album_name}</h4>
                        <h4><b>Artist: </b> {track.artist_name}</h4>
                        
                        <br></br>
                        <h1>Lyrics</h1><br></br>
                        <h4>{lyrics.lyrics_body}</h4>
                    </div>
                </React.Fragment>
            )
        }

        
    }
}

export default Lyrics
