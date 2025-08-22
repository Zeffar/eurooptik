document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (slug) {
        window.location.replace(`../index.html#${slug}`);
    } else {
        window.location.replace('../index.html#blog-section');
    }
});