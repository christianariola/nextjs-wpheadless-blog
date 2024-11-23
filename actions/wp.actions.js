'use server'

export async function getPosts(page, perPage = 2) {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`)

    const posts = await res.json();
    const totalPages = res.headers.get('X-WP-TotalPages');

    return { posts, totalPages: parseInt(totalPages, 10) };
}