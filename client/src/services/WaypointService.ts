import axios from 'axios';
import { TrackWaypoint } from 'src/context/CreateTrackContext';

export async function addOneWaypoint(waypointData: TrackWaypoint, trackId: string): Promise<void> {
    const apiUrl = 'http://127.0.0.1:3000/api/waypoint';

    try {
        const coords : [number, number] = waypointData.puzzleCoords.coords as [number, number];
        const response = await axios.post(apiUrl, {
            name: waypointData.pointName,
            trackId: trackId,
            explenation: waypointData.puzzleExplanation,
            payload: waypointData.puzzleContent,
            coords: {
                label: 'etukieta',
                att: coords[0],
                lat: coords[1],
                range: waypointData.pointRadius,
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Waypoint added successfully');
    } catch (error:any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error("No response received from the server");
        } else {
            throw new Error("Error in request setup: " + error.message);
        }

        throw new Error('Failed to add waypoint');
    }
}
