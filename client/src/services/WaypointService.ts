import axios from 'axios';
import { TrackWaypoint } from 'src/context/CreateTrackContext';

export async function addOneWaypoint(waypointData: TrackWaypoint, trackId: string): Promise<void> {
    const apiUrl = 'http://127.0.0.1:3000/api/track/waypoint/text/'+trackId;

    try {
        const coords = waypointData.puzzleCoords.coords;
        const response = await axios.post(apiUrl, {
            name: waypointData.pointName,
            explenation: waypointData.puzzleExplanation,
            payload: waypointData.puzzleContent,
            coords: {
                label: 'etykieta',
                long: coords.lng,
                lat: coords.lat,
                radius: waypointData.pointRadius,
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
