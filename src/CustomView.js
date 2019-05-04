import React from 'react';

export default class CustomView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            transferDisabled: true
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.transferCall = this.transferCall.bind(this);
    }

    componentDidMount() {
        this.callRequest = setInterval(()=>{
            fetch('https://aureolin-zorse-8830.twil.io/check-call-availability?number='+this.state.num)
                .then(res => res.json())
                .then((res)=>{
                    if(res.length && res instanceof Array) {
                        this.setState({...this.state, transferDisabled: false})
                    } else {
                        this.setState({...this.state, transferDisabled: true})
                    }
                });
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.callRequest);
    }

    transferCall() {
        fetch('https://aureolin-zorse-830.twil.io/transfer-call-dynamic?number='+this.state.num+'&agent='+this.props["current-sid"])
            .then(res => res.json())
            .then(data => data.results);
    }
    updateInputValue(evt) {
        this.setState({...this.state, num: evt.target.value})
    }
    render() {
        return(
            <div>
                <p>Click the button bellow to transfer the call.</p>
                <input type="text" value={this.state.num} onChange={this.updateInputValue} />
                <button onClick={this.transferCall} disabled={this.state.transferDisabled}>Transfer</button>
            </div>
        )
    }

}
