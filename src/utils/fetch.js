const URL = 'https://jsonplaceholder.typicode.com/posts/5/comments'
const URL1 = 'https://jsonplaceholder.typicode.com/comments/'


export function get(url = URL){
    return fetch(url);
}

export function deleteComment(id, url = URL1){
    return fetch(url+id, {
        method: 'DELETE',
      });
}

export function post(name='author', body='comment', url = URL){
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name: name,
            body: body,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

export function put(id=1, name='author', body='comment', url = URL1){
    return fetch(url+id,{
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            body: body,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}
