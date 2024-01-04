/**
 * Retrieve calls from the server.
 *
 * @return {Promise} A Promise that resolves to the response data.
 */
export async function getCalls() {
    console.log(process.env)
    try {
        const data = await fetch(process.env.REACT_APP_BASE_URL + '/activities');
        
        if(data.status !== 200){
            return Promise.reject('Error while fetching data, try again');
        }

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
        if(data.status !== 200){
            return Promise.reject('Network Error while Archiving Call, try again');
        }
        return data;
    } catch (err) {
        return Promise.reject('Network Error while Archiving call, try again');
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
        if(data.status !== 200){
            return Promise.reject('Network Error while unarchiving data, try again');
        }
        return data;
    } catch (err) {
        return Promise.reject('Network Error while unarchving call, try again');
    }
}

/**
 * Unarchives all data by sending a PATCH request to the specified URL.
 * 
 * @returns {Promise<any>} A promise that resolves with the response data if the request is successful.
 * @throws {Error} If there is an error while fetching the data.
 */
export async function unArchiveAll() {
    try {
        // Send a PATCH request to the reset URL
        const data = await fetch('https://cerulean-marlin-wig.cyclic.app/reset', {
            method: 'PATCH'
        });
        if(data.status !== 200){
            return Promise.reject('Network Error while unarching calls, try again');
        }
        return data;
    } catch (err) {
        throw new Error('Network Error while unarching calls fetching data, try again');
    }
}

/**
 * Archives all the calls.
 *
 * @param {Array} calls - An array of calls to be archived.
 * @return {Promise} A promise that resolves when all calls are archived.
 */
export async function ArchiveAll(calls) {
    try {
        // Iterate over each call and archive it
        for(let i = 0; i < calls.length; i++) {
            try {
                await archiveCall(calls[i].id)
            } catch (err) {
                // Reject the promise if there is an error
                return Promise.reject('Network Error while archiving some call, try again');
            }
        }
    } catch (err) {
        // Reject the promise if there is an error
        return Promise.reject('Network Error while archiving call, try again');
    }
}
