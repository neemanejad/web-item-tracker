import { TrackingItem } from "../TrackingItem";
import { mockTrackingItemData } from "../../mockData/mockTrackingItems";

export function TrackingBoard() {
    return (
        <>
            {mockTrackingItemData.map((itemData) => (
                <TrackingItem {...itemData} />
            ))}
        </>
        
    )
}