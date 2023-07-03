import React from 'react';
import { ItemContainer, ItemHeader, ItemInfo } from './styles';

export type TrackingItemProps = {
  itemName: string;
  trackedValue: string; // xpath
};

export function TrackingItem(props: TrackingItemProps) {
  const { itemName, trackedValue } = props;
  return (
    <ItemContainer>
      <ItemHeader>
        <p style={{ marginLeft: '10px' }}>{itemName}</p>
      </ItemHeader>
      <ItemInfo>
        <p style={{ marginLeft: '10px' }}>{trackedValue}</p>
      </ItemInfo>
    </ItemContainer>
  );
}
