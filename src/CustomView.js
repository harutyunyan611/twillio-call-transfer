import React from 'react';

export default class CustomView extends React.Component{
    transferCall() {
        fetch('https://aureolin-zorse-8830.twil.io/transfer-call')
            .then(res => res.json())
            .then(data => data.results);
    }
    render() {
        return(
            <div>
                <p>Click the button bellow to transfer the call.</p>
                <button onClick={this.transferCall}>Transfer</button>
            </div>
        )
    }
}