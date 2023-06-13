const URL = 'https://jsonplaceholder.typicode.com/post/1/comments'

export async function get(url = URL){
    const response = await fetch(url)
    return await response.json();
}

export async function deleteComment(id, url = URL){
    const response = await fetch('https://jsonplaceholder.typicode.com/post/1/',{//url + '/' + id, {
        method: 'DELETE'
    })
    return await response.json();
}