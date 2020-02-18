import React from 'react';
import { ListItemIcon, Badge } from '@material-ui/core';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import MoveToInbox from '@material-ui/icons/MoveToInbox';

function ItemCVD() {
  const listCVD = useShallowEqualSelector(state => state.listCVD);
  const filterCVD = listCVD.filter(el => el.lastName === 'Nguyễn');
  const notificationCVD = filterCVD.length;
  console.log(listCVD);
  alert(notificationCVD);
  return (
    <ListItemIcon>
      <Badge badgeContent={notificationCVD} color="secondary" max={99}>
        <MoveToInbox />
      </Badge>
    </ListItemIcon>
  );
}

export default ItemCVD;
