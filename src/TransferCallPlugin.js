import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CustomTaskListComponent from './CustomTaskListComponent';
import TransferButton from './TransferButton';
import flex from '@twilio/flex-ui';
import TransferTableComponent from "./TransferTableComponent";
import {transferWithTable} from './TransferButton';

const PLUGIN_NAME = 'TransferCallPlugin';

export default class TransferCallPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
    this.state = {
      callSid: ''
    };
    this.init = this.init.bind(this);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
      const TransferButton = transferWithTable(TransferTableComponent);
      let transferIndex = 0;
      manager.workerClient.on("reservationCreated", reservation => {
          reservation.on("accepted", currentReservation => {
              this.state.callSid = currentReservation.task.attributes.call_sid;
              console.log(9997, currentReservation.task.attributes.call_sid);
              flex.CallCanvas.Content.remove('transfer' + transferIndex);
              transferIndex++;
              flex.CallCanvas.Content.add(<TransferButton key={'transfer'+transferIndex} insightsClient={manager.insightsClient} url={manager.serviceConfiguration.runtime_domain} callSid={currentReservation.task.attributes.call_sid}/>);
          });
      });

      flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskListComponent key="demo-component" />,
      {
        sortOrder: -1,
      }
    );
    flex.CallCanvas.Content.add(<TransferButton key={'transfer'+transferIndex} insightsClient={manager.insightsClient} url={manager.serviceConfiguration.runtime_domain} callSid={this.state.callSid}/>);
  }
}
