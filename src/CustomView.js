import React from 'react';

export default class CustomView extends React.Component{
    transferCall() {
        //Request here
    }
    render() {
        return(
            <div>I am custom view
                <button onClick={this.transferCall}>transferCall</button>
            </div>
        )
    }
}