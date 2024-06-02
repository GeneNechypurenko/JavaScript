$(document).ready(function() {
    const userList = $('#userList');
    const userDetails = $('#userDetails');
    const showPostsButton = $('#showPostsButton');
    const userPosts = $('#userPosts');

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        success: function(users) {
            users.forEach(function(user) {
                const userItem = $('<li>')
                    .text(user.name)
                    .addClass('user-item')
                    .data('userId', user.id);
                userList.append(userItem);
            });
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

    userList.on('click', '.user-item', function() {
        const userId = $(this).data('userId');
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/users/${userId}`,
            method: 'GET',
            success: function(user) {
                userDetails.html(`
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> ${user.website}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                `);
                showPostsButton.data('userId', user.id).removeClass('hidden');
                userPosts.addClass('hidden').empty();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    showPostsButton.on('click', function() {
        const userId = $(this).data('userId');
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: 'GET',
            data: { userId: userId },
            success: function(posts) {
                userPosts.removeClass('hidden').html('<h3>Posts:</h3>');
                posts.forEach(function(post) {
                    const postItem = $('<div>').html(`
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                        <hr>
                    `);
                    userPosts.append(postItem);
                });
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
