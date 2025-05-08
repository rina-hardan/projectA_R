
import axios from 'axios';
export const FAILED = 0, SUCCESS = 1, NOT_FOUND = 2;


const BASE_URL = 'http://localhost:5000/api';

export const sendRequest = async ({ method, url, params = {}, body = null, headers = {} }) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    params,  // אם יש פרמטרים לשאילתא
    data: body,  // אם יש גוף לבקשה
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return { data: response.data, status: 'SUCCESS' };
  } catch (error) {
    console.error(error);
    return { data: null, status: 'FAILED' };
  }
};

// export default sendRequest;








export async function checkIfExists(resource, queryString) {
    try {
        const response = await fetch(`http://localhost:3000/${resource}?${queryString}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length) {
                return { data: data[0], status: SUCCESS };
            }
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(error);
        return { data: null, status: FAILED };
    }
}

export async function addEntity(url,newObject) {
    try {
        const response = await fetch("http://localhost:3000/"+url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObject),
        });

        if (response.ok) {
            const createdObject = await response.json();
            return { data: createdObject, status: SUCCESS };
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(error);
        return { data: null, status: FAILED };
    }
}

export async function getById(url) {
    try {
        const response = await fetch("http://localhost:3000/"+url);
        if (response.ok) {
            const data = await response.json();
            if (data.length) {
                return { data, status: SUCCESS };
            }
        }
        return { data: [], status: NOT_FOUND };
    } catch (error) {
        console.error(error);
        return { data: null, status: FAILED };
    }
}

export async function updateEntity(resource, id, updates) {
    try {
        const response = await fetch(`http://localhost:3000/${resource}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        });

        if (response.ok) {
            return { data: null, status: SUCCESS };
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(error);
        return { data: null, status: FAILED };
    }
}

export async function deleteEntity(url) {
    try {
        const response = await fetch(`http://localhost:3000/${url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return { data: null, status: SUCCESS };
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(`Error while deleting ${resource} with ID ${id}:`, error);
        return { data: null, status: FAILED };
    }
}

export async function sortEntities(resource, userId, option) {
    try {
        let url = `http://localhost:3000/${resource}?userId=${userId}`;
        if (option !== "random") {
            url += `&_sort=${option}`;
        }
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return option === "random"
                ? { data: data.sort(() => Math.random() - 0.5), status: SUCCESS }
                : { data, status: SUCCESS };
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(`Error in sortByOption for ${resource}:`, error);
        return { data: null, status: FAILED };
    }
}

export async function searchEntities(url) {
    try {
        const response = await fetch("http://localhost:3000/"+url);
        if (response.ok) {
            const data = await response.json();
            if (data.length) {
                return { data, status: SUCCESS };
            }
        }
        return { data: null, status: NOT_FOUND };
    } catch (error) {
        console.error(error);
        return { data: null, status: FAILED };
    }
}

