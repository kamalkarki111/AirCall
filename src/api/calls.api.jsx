/**
 * Retrieve calls from the server.
 *
 * @return {Promise} A Promise that resolves to the response data.
 */
export async function getCalls() {
    console.log(process.env)
    try {
        const data = await fetch(process.env.REACT_APP_BASE_URL + '/activities')
        const respnse = await data.json();
        return respnse;
    } catch (err) {
        return Promise.reject('Error while fetching data, try again');
    }
}

/**
 * Archives a call by updating its is_archived property to true.
 *
 * @param {string} id - The ID of the call to be archived.
 * @return {Promise<Object>} - A Promise that resolves to the JSON response from the server.
 */
export async function archiveCall(id) {
    try {
        const data = await fetch('https://cerulean-marlin-wig.cyclic.app/activities/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_archived: true
            })
        })
        return data;
    } catch (err) {
        return Promise.reject('Error while fetching data, try again');
    }
}

/**
 * Archives an activity by updating the 'is_archived' property to true.
 *
 * @param {string} id - The ID of the activity to be unarchived.
 * @return {Object} - The response object containing the unarchived activity data.
 */
export async function unArchiveCall(id) {
    try {
        const data = await fetch('https://cerulean-marlin-wig.cyclic.app/activities/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_archived: false
            })
        })
        return data;
    } catch (err) {
        return Promise.reject('Error while fetching data, try again');
    }
}

export async function unArchiveAll() {
    try {
        const data = await fetch('https://cerulean-marlin-wig.cyclic.app/reset', {
            method: 'PATCH'
        })
        return data;
    } catch (err) {
        return Promise.reject('Error while fetching data, try again');
    }
}