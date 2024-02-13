import axios from "axios";

export async function addOneTrack(
  name: string,
  description: string
): Promise<void> {
  const apiUrl = "http://127.0.0.1:3000/api/track";

	try {
		const response = await axios.post(
		apiUrl,
		{
			name: name,
			description: description,
		},
		{
			headers: {
			"Content-Type": "application/json",
			},
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
