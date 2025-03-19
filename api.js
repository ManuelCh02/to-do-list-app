const API = 'http://localhost:3002/';

export async function fetchApi() {
    try {
        const response = await fetch(`${API}tasks`);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error(error);
    }
} 

export const taskInServer = async (body) => {
    const response = await fetch(`${API}tasks`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
    return response
};