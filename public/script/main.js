const content = document.querySelector('#content')
const postModal = document.querySelector('#post-modal')

const closePostModal = document.querySelector('.close')

const postTitle = document.querySelector('#post-modal #title')
const postDescription = document.querySelector('#post-modal #description')
const postImage = document.querySelector('#post-modal #image-url')
const addPostBtn = document.querySelector('#post-modal #add-post-btn')

const loginButton = document.querySelector('#login-button')
const navContainer = document.querySelector('.container')


closePostModal.addEventListener('click', () => {
    postModal.style.display = 'none'
})


function renderUser(user) {
    const userprofile = document.createElement('a')
    userprofile.setAttribute('href',`./pages/profile.html?id=${user.id}`)

    const userDiv = document.createElement('div')
    userDiv.classList.add('d-flex')
    userDiv.classList.add('align-items-center')

    const userImg = document.createElement('img')
    userImg.classList.add('rounded-circle')
    userImg.classList.add('mr-3')
    userImg.setAttribute('width', '75')
    userImg.setAttribute('height', '75')
    userImg.setAttribute('src', user.img_url)

    const userName = document.createElement('h6')
    userName.classList.add('text-white')
    userName.textContent = user.name

    userDiv.appendChild(userImg)
    userDiv.appendChild(userName)
    userprofile.appendChild(userDiv)
    console.log(userprofile);

    return userprofile
}

function renderAddPost(user) {


    const addPost = document.createElement('div');
    addPost.classList.add('add-post');
    addPost.classList.add('col-sm-6')
    addPost.classList.add('offset-sm-3')

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    const avatarImg = document.createElement('img');
    avatarImg.src = user.img_url;
    avatarImg.alt = 'Avatar';
    avatar.appendChild(avatarImg);

    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Create Post';

    input.addEventListener('click', () => {
        postModal.style.display = 'initial'
    })

    form.appendChild(input);

    addPost.appendChild(avatar);
    addPost.appendChild(form);



    document.body.insertBefore(addPost, content);
}




function renderPost(post) {
    const postBlock = document.createElement('div')
    postBlock.classList.add('post-block')

    // Header
    const postHeader = document.createElement('div')
    postHeader.classList.add('d-flex')
    postHeader.classList.add('justify-content-between')

    const flexHeader = document.createElement('div')
    flexHeader.classList.add('d-flex')
    flexHeader.classList.add('mb-3')

    const mrDiv = document.createElement('div')
    mrDiv.classList.add('mr-2')

    const userImg = document.createElement('img')
    userImg.setAttribute('src', post.img_url)
    userImg.classList.add('author-img')

    mrDiv.appendChild(userImg)

    const userDate = document.createElement('div')

    const userLink = document.createElement('a')
    userLink.setAttribute('href', `./pages/profile.html?id=${post.user_id}`)

    const userName = document.createElement('h5')
    userName.classList.add('mb-0')
    userName.classList.add('text-dark')
    userName.textContent = post.name

    userLink.appendChild(userName)

    const postDate = document.createElement('p')
    postDate.classList.add('mb-0')
    postDate.classList.add('text-muted')
    postDate.textContent = post.post_date.split('T')[0]

    userDate.appendChild(userLink)
    userDate.appendChild(postDate)

    flexHeader.appendChild(mrDiv)
    flexHeader.appendChild(userDate)

    postBlock.appendChild(flexHeader)

    // end of header 

    const postContent = document.createElement('div')
    postContent.classList.add('post-block__content')
    postContent.classList.add('mb-2')

    const postTitle = document.createElement('h5')
    postTitle.textContent = post.title

    const postDesc = document.createElement('p')
    postDesc.textContent = post.description

    const postImg = document.createElement('img')
    postImg.setAttribute('src', post.post_img)

    postContent.appendChild(postTitle)
    postContent.appendChild(postDesc)
    postContent.appendChild(postImg)

    postBlock.appendChild(postContent)

    // end of content 

    const postVotes = document.createElement('div')
    postVotes.classList.add('mb-3')

    const votesDisplay = document.createElement('div')
    votesDisplay.classList.add('d-flex')
    votesDisplay.classList.add('justify-content-between')
    votesDisplay.classList.add('mb-2')

    const votesFlex = document.createElement('div')
    votesFlex.classList.add('d-flex')

    const voteUpSpan = document.createElement('span')
    voteUpSpan.classList.add('mr-2')
    voteUpSpan.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>'

    const votesCount = document.createElement('p')





    const voteDownSpan = document.createElement('span')
    voteDownSpan.classList.add('ml-2')
    voteDownSpan.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>'

    let votedUp = false;
    let votedDown = false;

    fetch(`/votes${post.id}`)
        .then(data => data.json())
        .then(data => {
            votesCount.textContent = data.data.total_sum == null ? 0 : data.data.total_sum
            voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
            voteDownSpan.innerHTML = data.data.user_vote == -1 ? '<i class="fa-solid fa-thumbs-down"></i>' : '<i class="fa-regular fa-thumbs-down"></i>'
        })


    voteUpSpan.addEventListener('click', () => {
        fetch(`/votes${post.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                value: 1
            })
        })
            .then(data => data.json())
            .then(data => {
                votesCount.textContent = data.data.total_sum == null ? 0 : data.data.total_sum
                voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
                voteDownSpan.innerHTML = data.data.user_vote == -1 ? '<i class="fa-solid fa-thumbs-down"></i>' : '<i class="fa-regular fa-thumbs-down"></i>'
            })
            .catch(err => alert('You need to login'))
    })

    voteDownSpan.addEventListener('click', () => {
        fetch(`/votes${post.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                value: -1
            })
        })
            .then(data => data.json())
            .then(data => {
                votesCount.textContent = data.data.total_sum == null ? 0 : data.data.total_sum
                voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
                voteDownSpan.innerHTML = data.data.user_vote == -1 ? '<i class="fa-solid fa-thumbs-down"></i>' : '<i class="fa-regular fa-thumbs-down"></i>'
            })
            .catch(err => alert('You need to login'))
    })


    // fetch(`/userVotes${post.id}`)
    //     .then(data => data.json())
    //     .then(data => {
    //         if (!data.data) {
    //             voteUpSpan.addEventListener('click', () => {
    //                 fetch('/votes', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         post_id: post.id,
    //                         value: 1
    //                     })
    //                 })
    //                     .then(data => data.json())
    //                     .then(data => {
    //                         votesCount.textContent = data.data.sum
    //                         voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
    //                         voteDownSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-regular fa-thumbs-down"></i>' : '<i class="fa-solid fa-thumbs-down"></i>'
    //                     })
    //             })

    //             voteDownSpan.addEventListener('click', () => {
    //                 fetch('/votes', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         post_id: post.id,
    //                         value: -1
    //                     })
    //                 })
    //                     .then(data => data.json())
    //                     .then(data => {
    //                         votesCount.textContent = data.data.sum
    //                         voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
    //                         voteDownSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-regular fa-thumbs-down"></i>' : '<i class="fa-solid fa-thumbs-down"></i>'
    //                     })
    //             })
    //         } else {
    //             votesCount.textContent = data.data.sum
    //             voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
    //             voteDownSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-regular fa-thumbs-down"></i>' : '<i class="fa-solid fa-thumbs-down"></i>'

    //             if (data.data.user_vote == 1) {
    //                 voteUpSpan.addEventListener('click', () => {
    //                     fetch(`/votes${post.id}`, {
    //                         method: 'DELETE'
    //                     }).then(data => data.json())
    //                         .then(data => {
    //                             votesCount.textContent = data.data.sum
    //                             voteUpSpan.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>'
    //                             voteDownSpan.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>'
    //                         })
    //                 })

    //                 voteDownSpan.addEventListener('click', () => {
    //                     fetch('/updateVote', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-type': 'application/json'
    //                         },
    //                         body: JSON.stringify({
    //                             post_id: post.id,
    //                             value: -1
    //                         })
    //                     })
    //                         .then(data => data.json())
    //                         .then(data => {
    //                             votesCount.textContent = data.data.sum
    //                             voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
    //                             voteDownSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-regular fa-thumbs-down"></i>' : '<i class="fa-solid fa-thumbs-down"></i>'
    //                         })
    //                 })
    //             }else if(data.data.user_vote == -1){
    //                 voteDownSpan.addEventListener('click', () => {
    //                     fetch(`/votes${post.id}`, {
    //                         method: 'DELETE'
    //                     }).then(data => data.json())
    //                         .then(data => {
    //                             votesCount.textContent = data.data.sum
    //                             voteUpSpan.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>'
    //                             voteDownSpan.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>'
    //                         })
    //                 })

    //                 voteUpSpan.addEventListener('click', () => {
    //                     fetch('/updateVote', {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-type': 'application/json'
    //                         },
    //                         body: JSON.stringify({
    //                             post_id: post.id,
    //                             value: 1
    //                         })
    //                     })
    //                         .then(data => data.json())
    //                         .then(data => {
    //                             votesCount.textContent = data.data.sum
    //                             voteUpSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'
    //                             voteDownSpan.innerHTML = data.data.user_vote == 1 ? '<i class="fa-regular fa-thumbs-down"></i>' : '<i class="fa-solid fa-thumbs-down"></i>'
    //                         })
    //                 })
    //             }
    //         }
    //     })




    votesFlex.appendChild(voteUpSpan)
    votesFlex.appendChild(votesCount)
    votesFlex.appendChild(voteDownSpan)

    votesDisplay.appendChild(votesFlex)

    postVotes.appendChild(votesDisplay)

    postBlock.appendChild(postVotes)

    // end of post votes 

    const postBlockComment = document.createElement('div')
    postBlockComment.classList.add('post-block__comments')

    const commentInputDiv = document.createElement('div')
    commentInputDiv.classList.add('input-group')
    commentInputDiv.classList.add('mb-3')

    const commentInputField = document.createElement('input')
    commentInputField.classList.add('form-control')
    commentInputField.setAttribute('type', 'text')
    commentInputField.setAttribute('placeholder', 'Add your comment..')

    const addCommentBtnDiv = document.createElement('div')
    addCommentBtnDiv.classList.add('input-group-append')

    const addCommentBtn = document.createElement('button')
    addCommentBtn.classList.add('btn')
    addCommentBtn.classList.add('btn-custom')
    addCommentBtn.setAttribute('type', 'button')
    addCommentBtn.setAttribute('id', 'button-addon2')
    addCommentBtn.innerHTML = '<i class="fa fa-paper-plane"></i>'

    addCommentBtnDiv.appendChild(addCommentBtn)
    commentInputDiv.appendChild(commentInputField)
    commentInputDiv.appendChild(addCommentBtnDiv)
    postBlockComment.appendChild(commentInputDiv)



    // end of comment input 


    const commentViewBox = document.createElement('div')
    commentViewBox.classList.add('comment-view-box')
    commentViewBox.classList.add('mb-3')


    fetch(`/comments${post.id}`)
        .then(data => data.json())
        .then(data => {
            commentViewBox.textContent = ''
            data.data.forEach(comment => commentViewBox.appendChild(renderComments(comment)))
        })
        .catch(err => console.log(err))


    addCommentBtn.addEventListener('click', () => {
        if (commentInputField.value) {
            fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post.id,
                    content: commentInputField.value
                })
            })
                .then(data => data.json())
                .then(data => {
                    commentViewBox.appendChild(renderComments(data.data))
                    commentInputField.value = ''
                })
                .catch(err => alert('You need to login'))
        }
    })

    postBlockComment.appendChild(commentViewBox)
    postBlock.appendChild(postBlockComment)

    return postBlock
}


function renderComments(comment) {

    const commentDiv = document.createElement('div')
    commentDiv.classList.add('d-flex')
    commentDiv.classList.add('mb-2')

    const userImg = document.createElement('img')
    userImg.setAttribute('src', comment.img_url)
    userImg.setAttribute('alt', 'User Image')
    userImg.classList.add('author-img')
    userImg.classList.add('author-img--small')
    userImg.classList.add('mr-2')

    const userNameDateDiv = document.createElement('div')
    userNameDateDiv.classList.add('bg-light')
    userNameDateDiv.classList.add('comment-body')

    const userNameDate = document.createElement('h6')
    userNameDate.classList.add('mb-1')



    const userName = document.createElement('a')
    userName.setAttribute('href', `./pages/profile.html?id=${comment.id}`)
    userName.classList.add('text-dark')
    userName.textContent = comment.name

    const commentDate = document.createElement('small')
    commentDate.classList.add('text-muted')
    commentDate.classList.add('ml-2')
    commentDate.textContent = comment.comment_data.split('T')[0]

    const commentContent = document.createElement('p')
    commentContent.classList.add('mb-1')
    commentContent.textContent = comment.content

    userNameDate.appendChild(userName)
    userNameDate.appendChild(commentDate)
    userNameDateDiv.appendChild(userNameDate)
    userNameDateDiv.appendChild(commentContent)

    commentDiv.appendChild(userImg)
    commentDiv.appendChild(userNameDateDiv)


    return commentDiv

}




fetch('/home')
    .then(result => result.json())
    .then((result) => {
        //content.textContent = '';
        if (result.user) {
            renderAddPost(result.user)
            if (loginButton) {
                loginButton.parentNode.removeChild(loginButton);
                navContainer.appendChild(renderUser(result.user))
            }
        }
        result.data.forEach(post => content.appendChild(renderPost(post)))
    })
    .catch(err => console.log(err))




addPostBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitle.value,
                description: postDescription.value,
                post_img: postImage.value
            })
        });

        const data = await response.json();
        content.appendChild(renderPost(data.data));
        postModal.style.display = 'none';
    } catch (err) {
        console.log(err);
    }
});
