'use server'

export async function getPosts(perPage = 2, page = 1) {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`)

    const posts = await res.json();

    return posts;
}