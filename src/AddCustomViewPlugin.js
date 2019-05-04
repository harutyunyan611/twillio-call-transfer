import {FlexPlugin} from "flex-plugin";
import {View} from "@twilio/flex-ui";
import React from 'react';
import CustomView from './CustomView';
import CustomSidebarButton from './CustomSidebarButton'

const PLUGIN_NAME = 'TransferCallPluginView';

export default class TransferCallPluginView extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    init(flex, manager) {
        console.log(888888);
        console.log(manager.workerClient.accountSid);
        manager.workerClient.on("reservationAccepted", reservation => {
            console.log(7777);
            console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
            console.log(reservation.task.priority)        // 1
            console.log(reservation.task.age)             // 300
            console.log(reservation.task.sid)             // WTxxx
            console.log(reservation.sid)                  // WRxxx
            console.log(reservation);
        });

        flex.SideNav.Content.add(
            <CustomSidebarButton asd={4} key="custom-view-button"/>
        );

        flex.ViewCollection.Content.add(
            <View name="custom-view" key="custom-view">
                <CustomView current-sid={manager.workerClient.accountSid} />
            </View>
        )
    }

}
