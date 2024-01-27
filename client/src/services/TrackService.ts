export async function addOneTrack(name: string, description: string): Promise<void> {
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
    console.log('Track added successfully');
  } else {
    const errorData = await response.json();    
    throw new Error(errorData.message);
  }
}