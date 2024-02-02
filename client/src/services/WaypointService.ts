import { TrackWaypoint } from "src/context/CreateTrackContext";

export async function addOneWaypoint(waypointData: TrackWaypoint, trackId: string): Promise<void> {
    const apiUrl = 'http://127.0.0.1:3000/api/waypoint';
  
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": waypointData.pointName,
            "trackId": trackId,
            "explenation": waypointData.puzzleExplanation,
            "payload": waypointData.puzzleContent,
            "coords":{
                "label": "etukieta",
                "att": waypointData.puzzleCoords.coords,
                "lat": waypointData.puzzleCoords.coords,
                "range": waypointData.pointRadius
            }
        }),
    });
  
    if (response.ok) {
        console.log('Waypoint added successfully');
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}