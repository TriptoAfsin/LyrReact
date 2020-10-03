import React, { Component } from 'react'
import { Consumer } from '../../context'
import './customStyles.css'
import axios from 'axios'
import swal from 'sweetalert';
import Spinner from '../layout/Spinner'



class Search extends Component {

    state = {
        trackTitle: '',
        loading: false,
    }

    onChangeField = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   


    findTrack = (dispatch, e) => {
        e.preventDefault();

        const {trackTitle, loading} = this.state;

        if(trackTitle === '' || trackTitle === null){
            swal("Empty Search Field", "search by track name");
        }

        else{
            this.setState({
                loading: true
            })
    
    
           
            const apiKey = process.env.REACT_APP_MM_KEY;
            const cors = 'https://cors-anywhere.herokuapp.com/' //this thing is required for this api
            const url = "https://api.musixmatch.com/ws/1.1/";
    
            axios.get(`${cors}${url}track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`)
                        .then(res => {
                            console.log(res.data);
                            dispatch({
                                type: 'SEARCH_TRACKS',
                                payload: res.data.message.body.track_list
                            });
                            this.setState({
                                trackTitle: '',
                                loading: false
                            })
                        }).catch(err => console.log(err));
        }
       console.log("Submit called");
    }


    render() {
        const {trackTitle, loading} = this.state;

        if(loading){
            return (
                <div>
                    <Spinner></Spinner>
                    <h3 className="text-center mb-4">Please Wait...</h3>
                    
                </div>
            )
        }
        else {
            return (
                <Consumer >
                    {
                        value => {
                            console.log(value);
                            const {dispatch} = value;
                            return (
                                <div className="card card-body mb-4 p4">
                                    <h1 className="text-center">
                                        <i className="fas fa-music" style={styles.icon}></i>Search For a Song
                                    </h1>
                                    <p className="lead text-center"> Search Lyrics</p>
                                    <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                        <div className="form-group">
                                            <input className="form-control form-control-lg" 
                                            placeholder="Search by Song Title" 
                                            name="trackTitle" 
                                            value={trackTitle}
                                            onChange={this.onChangeField}
                                            ></input>
                                        </div>
                                        <button className="btn my-primary-btn btn-lg btn-block mt-2 mb-4" type="submit" style={styles.button}>Search</button>
                                    </form>
                                </div>
                            )
                        }
                    }
                </Consumer>
            )
        } 
    }
}

const styles = {
    icon: {
        marginRight: '0.5rem',
        marginTop: '0.5rem'
    },
    
    button: {
        color: "white",
        backgroundColor: "#2bb640",
        border: "none"
    }
}



export default Search
