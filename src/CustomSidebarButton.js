import React from 'react';
import { SideLink, Actions } from "@twilio/flex-ui";
const CustomSidebarButton = ({ activeView }) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', { viewName: 'custom-view' });
    }

    return (
      <SideLink
          icon='SendLarge'
          showLabel={true}
          iconActive='SendLarge'
          isActive={activeView === 'custom-view'}
          onClick={navigate}
      >
        Custom View
      </SideLink>
  )
};

export default CustomSidebarButton;