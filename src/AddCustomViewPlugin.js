import {FlexPlugin} from "flex-plugin";
import {View} from "@twilio/flex-ui";
import React from 'react';
import CustomView from './CustomView';
import CustomSidebarButton from './CustomSidebarButton'

const PLUGIN_NAME = 'TransferCallPluginView';

export default class TransferCallPluginView extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
        this.transferIndex = 0;
        this.updateView = this.updateView.bind(this);
    }

    init(flex, manager) {

        flex.SideNav.Content.add(
            <CustomSidebarButton key="custom-view-button-0" />
        );

        flex.ViewCollection.Content.add(
            <View name="custom-view" key="custom-view-0">
                <CustomView fmanager={manager} />
            </View>
        )
    }

    updateView(flex, accSid, callSid) {
        flex.SideNav.Content.remove('custom-view-button-' + this.transferIndex);
        flex.ViewCollection.Content.remove('custom-view-' + this.transferIndex);

        this.transferIndex++;
        debugger;
        flex.SideNav.Content.add(
            <CustomSidebarButton key={'custom-view-button-' + this.transferIndex} />
        );

        flex.ViewCollection.Content.add(
            <View name="custom-view" key={'custom-view-' + this.transferIndex}>
                <CustomView call-sid={callSid} />
            </View>
        )
    }

}
