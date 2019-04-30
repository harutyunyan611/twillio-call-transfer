import React from 'react';

export default class CustomView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: ''
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.transferCall = this.transferCall.bind(this);
    }
    transferCall() {
        fetch('https://aureolin-zorse-8830.twil.io/transfer-call')
            .then(res => res.json())
            .then(data => data.results);
    }
    updateInputValue(evt) {
        this.setState({
                          num: evt.target.value
                      });
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
