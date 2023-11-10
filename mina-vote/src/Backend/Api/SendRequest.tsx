export async function Request(method, postData) {
  try {
    console.log("Sending data to server:", postData);
    const response = await fetch(`http://160.20.108.68:3040/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('Data successfully received from the server:', jsonResponse);
      return jsonResponse;
    } else {
      const errorResponse = await response.text();
      throw new Error('Failed to receive data: ' + errorResponse);
    }
  } catch (error) {
    console.error('Error in Request function:', error);
    throw error;
  }
}
