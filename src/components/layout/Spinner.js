import React, { Component } from 'react'
import spinner from '../img/spinner1.gif'

export class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={spinner} style={styles.spinner} alt="Loading..."></img>
            </div>
        )
    }
}
const styles = {
    spinner: {
        width: '80px',
        margin: '40px auto',
        display: 'block'
    }
}

export default Spinner
