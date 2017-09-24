import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const ChatBadge = (props) => (
  <div style={{ marginLeft: '10px'}}>
    <Badge
      badgeContent={props.newMessages}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Click To Clear Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);

export {ChatBadge};
