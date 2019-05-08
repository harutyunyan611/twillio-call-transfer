import React from 'react';

export default class CustomView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            transferDisabled: true,
            callSid: ""
        };
        var manager = this.props.fmanager;
        fetch('https://aureolin-zorse-8830.twil.io/list-reservations?workspaceSid='+manager.workerClient._routes.workspaceSid+'&workerSid='+manager.workerClient._routes.workerSid)
            .then(res => res.json())
            .then(data => {
                console.log(123, data);
                const acceptedCall = data.find((call) => call.status === 'accepted');
                const callSid = acceptedCall ? acceptedCall.sid : acceptedCall;
                if (acceptedCall) {
                    this.acceptedCallInterval = setInterval(() => {
                        fetch('https://aureolin-zorse-8830.twil.io/list-reservations?workspaceSid='+manager.workerClient._routes.workspaceSid+'&workerSid='+manager.workerClient._routes.workerSid)
                            .then(res => res.json())
                            .then(data => {
                                console.log(123, data);
                                const acceptedCall = data.find((call) => call.status === 'accepted');
                                const callSid = acceptedCall ? acceptedCall.sid : acceptedCall;
                                if (!acceptedCall) {
                                    clearInterval(this.acceptedCallInterval);
                                }
                                this.setState({
                                    ...this.state,
                                    transferDisabled: !callSid,
                                    callSid: callSid
                                })
                            });
                    }, 3000)
                }
                this.setState({
                    ...this.state,
                    transferDisabled: !callSid,
                    callSid: callSid
                })
            });
        console.log(1111111);
        console.log(this.props["call-sid"]);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.transferCall = this.transferCall.bind(this);
        console.log(manager);
        manager.workerClient.on("reservationCreated", reservation => {
            reservation.on("accepted", reservation1 => {
                console.log(8888, reservation1);
                console.log(8888, reservation1.task.sid);
                console.log({
                    ...this.state,
                    transferDisabled: !reservation1.task.sid,
                    callSid: reservation1.task.sid
                });
                this.setState({
                    ...this.state,
                    transferDisabled: !reservation1.task.sid,
                    callSid: reservation1.task.sid
                });
                console.log(this.state);
            });
            reservation.on("wrapup", reservation1 => {
                this.setState({
                    ...this.state,
                    transferDisabled: true,
                    callSid:""
                })
            });

        });
    }

    transferCall() {
        fetch('https://aureolin-zorse-8830.twil.io/transfer-call-dynamic?number='+this.state.num+'&csid='+this.state.callSid)
            .then(res => res.json())
            .then(data => data.results);
    }
    updateInputValue(evt) {
        this.setState({...this.state, num: evt.target.value})
    }

    componentWillUnmount() {
        if(this.acceptedCallInterval) {
            clearInterval(this.acceptedCallInterval);
        }
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



