const FETCH_TIMEOUT = 5000;

const GET = (url, options) => {
    
    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    let didTimeout = false;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then((response) => {
            clearTimeout(timeout);
            if(!didTimeout) {
                if(response.ok) {
                    resolve(response.json());
                }else {
                    reject(response);
                }
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

const POST = (url, params, options) => {
    
    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }
    
    let didTimeout = false;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        })
        .then((response) => {
            clearTimeout(timeout);
            if(!didTimeout) {
                if(response.ok) {
                    resolve(response.json());
                }else {
                    reject(response);
                }
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

const PUT = (url, params, options) => {
    
    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    let didTimeout = false;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);
        
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(params)
        })
        .then((response) => {
            clearTimeout(timeout);
            if(!didTimeout) {
                if(response.ok) {
                    resolve(response.json());
                }else {
                    reject(response);
                }
            }
        })
        .catch((error) => {
            reject(error);
        })
    });

}

const DELETE = (url, params, options) => {

    let headers = {};
    if(options !== undefined) {
        if(options.headers !== undefined) {
            headers = options.headers;
        }
    }

    let didTimeout = false;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(params)
        })
        .then((response) => {
            clearTimeout(timeout);
            if(!didTimeout) {
                // 일단 삭제는 되는데 status 코드 이상하게 먹음. 물어볼 것
                if(response.ok) {
                    resolve(response);
                }else {
                    reject(response);
                }
            }
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export default {
    GET,
    POST,
    PUT,
    DELETE
}


/*
.then((data) => {
    
})
.catch((error) => {
    switch(error.status) {
        case 400:
            console.log('Bad Request')
            break;
        case 401:
            console.log('Unauthorized');
            break;
        case 403:
            console.log('Forbidden');
            break;
        case 404:
            console.log('Not Found');
            break;
        case 500:
            console.log('Internal Server Error');
            break;
        default:
            console.log('알 수 없는 에러입니다.');
            break;
    }
})
*/