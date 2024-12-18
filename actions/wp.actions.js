'use server'

export async function getPosts(page, perPage = 2) {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`);

    const posts = await res.json();
    const totalPages = res.headers.get('X-WP-TotalPages');

    return { posts, totalPages: parseInt(totalPages, 10) };
}

export async function getPost(slug) {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/posts?slug=${slug}`);

    const post = await res.json();

    return post;
}

export async function getCategories() {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/categories`);

    const categories = await res.json();

    return categories;
}

export async function getPostsByCategoryName(categoryName, page, perPage = 2) {
    try {
        // Get Category ID
        const categoryResponse = await fetch(`http://localhost/chanblog/wp-json/wp/v2/categories?slug=${categoryName}`);
        const categories = await categoryResponse.json();
        const categoryId = categories[0].id;
    
        // Get Post by Category ID
        const postResponse = await fetch(`http://localhost/chanblog/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}`);
        const posts = await postResponse.json();
        const totalPages = postResponse.headers.get('X-WP-TotalPages');
    
        return { posts, totalPages: parseInt(totalPages, 10) };
    } catch (error) {
        console.log(error);

        return [];
    }
}

export async function postComment(data) {
    const res = await fetch(`http://localhost/chanblog/wp-json/wp/v2/comments`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },

        body: JSON.stringify({
        post: data.post,
        author_name: data.author_name,
        author_email: data.author_email,
        content: data.content,
        }),
    });
    const comments = await res.json();
    console.log(comments);
    return comments;
}

export async function getComments(postId) {
    const res = await fetch(
        `http://localhost/chanblog/wp-json/wp/v2/comments?post=${postId}`
    );
    const comments = await res.json();
    return comments;
}