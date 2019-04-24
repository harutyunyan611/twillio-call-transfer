import React from 'react';
import { SideLink, Actions } from "@twilio/flex-ui";
import {TransferIcon, TransferIconActive} from "./TransferIcons";

const CustomSidebarButton = ({ activeView }) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', { viewName: 'custom-view' });
    }

    return (
      <SideLink
          icon={<TransferIcon/>}
          showLabel={true}
          iconActive={<TransferIconActive/>}
          isActive={activeView === 'custom-view'}
          onClick={navigate}
      >
        Custom View
      </SideLink>
  )
};

export default CustomSidebarButton;