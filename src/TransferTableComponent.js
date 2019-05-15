import React from 'react';
import { css } from 'react-emotion';

const transferButtonStyles = css`
    width: 100%;
    text-align: center;
    cursor: pointer;
`

const cellStyle = css`
    border: 1px solid black;
`

export default class TransferButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            buttonState: false
        };

    }
    createCall() {
        return undefined;
    }
    render() {
        return(
            <div className={transferButtonStyles} style={{
                opacity: this.state.buttonState ? 0.5 : 1,
                cursor: this.state.buttonState ? 'default': 'pointer'
            }}>
                <table className={cellStyle}>
                    <thead>
                        <tr className={cellStyle}>
                            <td className={cellStyle}>Contacts</td>
                            <td className={cellStyle}>Number</td>
                            <td className={cellStyle}>Calls</td>
                            <td className={cellStyle}>Transfer</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={cellStyle}>
                            <td className={cellStyle}>Hassan</td>
                            <td className={cellStyle}>+3243249324</td>
                            <td className={cellStyle}><button onClick={this.createCall}>Call</button></td>
                            <td className={cellStyle}><button onClick={this.transferCall}>Transfer</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}
