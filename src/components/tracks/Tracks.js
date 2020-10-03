import React, { Component } from 'react'
import { Consumer } from '../../context'
import Spinner from '../layout/Spinner'
import Track from './Track'

class Tracks extends Component {
    render() {
        return (
           <Consumer>
               {value => {
                   const { track_list, heading, loading, trackTitle } = value;
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
                            <h2 className="text-center mb-4">{heading}</h2>
                            <div className="row">
                                {track_list.map(item => (
                                    <Track track={item.track} key={item.track.track_id}></Track>
                                ))}
                            </div>
                        </React.Fragment>
                    )
                   }
               }}
           </Consumer>
        )
    }
}

export default Tracks
