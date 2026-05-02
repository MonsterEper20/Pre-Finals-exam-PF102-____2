let allComments = [];

const commentsContainer = document.getElementById('commentsContainer');
const searchInput = document.getElementById('searchInput');

// Fetch comments from the API
async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        allComments = await response.json();
        renderComments(allComments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        commentsContainer.innerHTML = '<div class="no-results">Error loading comments. Please try again.</div>';
    }
}

// Render comments
function renderComments(comments) {
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<div class="no-results">No comments found.</div>';
        return;
    }

    commentsContainer.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <div class="field-label">👤 Name</div>
            <div class="field-value">${escapeHtml(comment.name)}</div>
            
            <div class="field-label">📧 Email</div>
            <div class="field-value">${escapeHtml(comment.email)}</div>
            
            <div class="field-label">💬 Body</div>
            <div class="field-value">${escapeHtml(comment.body)}</div>
        </div>
    `).join('');
}

// Filter comments based on search input
function filterComments(query) {
    const lowerQuery = query.toLowerCase().trim();

    if (lowerQuery === '') {
        renderComments(allComments);
        return;
    }

    const filtered = allComments.filter(comment =>
        comment.name.toLowerCase().includes(lowerQuery)
    );

    renderComments(filtered);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listener for live search
searchInput.addEventListener('input', (e) => {
    filterComments(e.target.value);
});

// Initial fetch
fetchComments();

