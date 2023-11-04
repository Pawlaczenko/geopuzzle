export async function addOneTrack(name: string, description: string): Promise<void> {
    try {
      const apiUrl = 'http://127.0.0.1:3000/api/track';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description
         }),
      });
  
      if (response.ok) {
        // Request was successful
        console.log('Track added successfully');
      } else {
        // Handle the error case
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('An error occurred while making the API request:', error);
    }
}