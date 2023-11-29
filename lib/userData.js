
import { getToken } from "./authenticate";

async function handleRequest(endapi, method, data = {}) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endapi}`;
    const token = getToken();

    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    };

    //sets the requestOptions.body property to a JSON stringified
    if (method !== 'GET' && Object.keys(data).length > 0) {
        requestOptions.body = JSON.stringify(data);
    }

    const res = await fetch(url, requestOptions);

    if (res.status === 200) {
        return res.json();
    } else {
        return [];
    }

}

export async function addToFavourites(id) {
    return handleRequest(`favourites/${id}`, 'PUT');
}

export async function removeFromFavourites(id) {
    return handleRequest(`favourites/${id}`, 'DELETE');
}

export async function getFavourites() {
    return handleRequest('favourites', 'GET');
}

export async function addToHistory(id) {
    return handleRequest(`history/${id}`, 'PUT');
}

export async function removeFromHistory(id) {
    return handleRequest(`history/${id}`, 'DELETE');
}

export async function getHistory() {
    return handleRequest('history', 'GET');
}
