import React from 'react';

export default class CustomView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            transferDisabled: true,
            callSid: ""
        };
        console.log(1111111);
        console.log(this.props["call-sid"]);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.transferCall = this.transferCall.bind(this);
        var manager = this.props.fmanager;
        let callSid = "";
        console.log(manager);
        manager.workerClient.on("reservationCreated", reservation => {
            callSid = reservation.task.sid;
            this.setState({
                ...this.state,
                transferDisabled: !callSid,
                callSid
            })
            manager.workerClient.on("wrapup", reservation1 => {
                callSid = "";
                this.setState({
                    ...this.state,
                    transferDisabled: !callSid,
                    callSid
                })
            });
        });
    }

    transferCall() {
        fetch('https://aureolin-zorse-830.twil.io/transfer-call-dynamic?number='+this.state.num+'&csid='+this.state.callSid)
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
