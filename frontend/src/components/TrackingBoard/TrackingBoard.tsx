import { TrackingItem } from '../TrackingItem';
import { mockTrackingItemData } from '../../mockData/mockTrackingItems';
import React from 'react';

export function TrackingBoard() {
  return (
    <>
      {mockTrackingItemData.map((itemData) => (
        <TrackingItem {...itemData} />
      ))}
    </>
  );
}
