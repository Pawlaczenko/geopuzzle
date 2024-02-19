import axios from "axios";

export async function addOneTrack(
  name: string,
  description: string
): Promise<void> {
  	const apiUrl = "http://127.0.0.1:3000/api/track";

	try {
		const response = await axios.post( apiUrl,
			{
				name: name,
				description: description,
			}
		);
		return response.data.data._id;
  	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.message);
		} else if (error.request) {
			throw new Error("No response received from the server");
		} else {
			throw new Error("Error in request setup: " + error.message);
		}
  	}
}

export async function uploadTrackThumbnail(track_id: string, image: any) : Promise<void>{
	const url = `http://127.0.0.1:3000/api/track/thumbnail/${track_id}`;
	try {
		const response = await axios.post( url, {
			thumbnail: image
		})
		return true;
	} catch(err) {
		throw new Error("Coś poszło nie tak");
	}
}

export async function activateTrack(track_id: string) : Promise<void>{
	const url = `http://127.0.0.1:3000/api/track/${track_id}`;
	try {
		const response = await axios.patch( url, {
			isActive: true
		})
		return true;
	} catch(err) {
		throw new Error("Coś poszło nie tak");
	}
}