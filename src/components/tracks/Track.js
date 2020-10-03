import React from 'react'
import { Link } from 'react-router-dom'

function Track(props) {
    const {track} = props;

    return (

        <div className="col-md-6" >
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5><b>{track.track_name}</b></h5>
                    <h6><i className="fas fa-user" style={styles.icon}></i><b> Artist: </b>{track.artist_name}</h6>
                    <h6><i className="fas fa-compact-disc" style={styles.icon}></i><b> Album: </b>{track.album_name}</h6>
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark btn-block"><i className="fas fa-chevron-right" style={styles.icon}></i> View Lyrics</Link>
                </div>
            </div>
        </div>
    )
}

const styles = {
    icon: {
        marginRight: '0.5rem',
        marginTop: '0.5rem'
    }
}

export default Track
