
const elUsersList=document.querySelector('.users');
const elUsersTemplate=document.querySelector('.users-template').content;
const elUserHeading=document.querySelector('.users-heading');


const elPostsList=document.querySelector('.posts');
const elPostsTemplate=document.querySelector('.posts-template').content;
const elPostHeading = document.querySelector('users-heading');


const elCommentsList=document.querySelector('.comments');
const elCommentsTemplate=document.querySelector('.comments-template').content;
const elCommentsHeading=document.querySelector('.comments-heading');


function renderUsers(arr , node){
    node.innerHTML = null;

    const usersFragment=document.createDocumentFragment();
    
    arr.forEach((row)=>{

        
        const cloneTemplateUser =elUsersTemplate.cloneNode(true);
        cloneTemplateUser.querySelector('.user__username').textContent = row.username;
        cloneTemplateUser.querySelector('.user__name').textContent = row.name;
        cloneTemplateUser.querySelector('.user__email').textContent = row.email;
        cloneTemplateUser.querySelector('.user__email'). href =`mailto: ${row.email}`;
        cloneTemplateUser.querySelector(".user__address").textContent = `
        street: ${row.address.street} 
        suite:
        ${row.address.suite} 
        city: 
        ${row.address.city} 
        zipcode: 
        ${row.address.zipcode}`;
        cloneTemplateUser.querySelector('.user__location').href = `${row.address.geo.lat}${row.address.geo.lng}`;
        cloneTemplateUser.querySelector('.user__phone').href = row.phone;
        cloneTemplateUser.querySelector('.user__web-site').href = row.website;
        cloneTemplateUser.querySelector('.user__company').textContent = `
company name: ${row.company.name}
catchPhrase: ${row.company.catchPhrase}
bs: ${row.company.bs}
        `;
        cloneTemplateUser.querySelector('.user__btn').dataset.userId = row.id;

        
        
        usersFragment.appendChild(cloneTemplateUser);
        
    })
    
    node.appendChild(usersFragment);
    
}

async function getUsers(){
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    const data =await response.json();
    
    if(data){
        renderUsers(data,elUsersList);
    }
    
    
};

getUsers();





function renderPosts(arr ,node){
    node.innerHTML = null;
    
    const postsFragment=document.createDocumentFragment();
    
    
    arr.forEach((row)=>{
        
        const cloneTemplatePost = elPostsTemplate.cloneNode(true);
        
        cloneTemplatePost.querySelector('.post__title').textContent =row.title;
        cloneTemplatePost.querySelector('.post__desc').textContent =row.body;
        
        postsFragment.appendChild(cloneTemplatePost)
    })
    
    node.appendChild(postsFragment);
}

async function getPosts(userId){
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
    
    
    const data =await response.json();
    
    
    posts=data.filter((post)=>post.userId === userId);

    renderPosts(data, elPostsList);
    
};




function renderComment(arr ,node){
    
    const commentsFragment=document.createDocumentFragment();
    
    
    arr.forEach((row)=>{
        
        const cloneTemplateComment=elCommentsTemplate.cloneNode(true);
        
        cloneTemplateComment.querySelector('.comment__name').textContent =row.name;
        cloneTemplateComment.querySelector('.comment__email').textContent =row.email;
        cloneTemplateComment.querySelector('.comment__email'). href =`mailto: ${row.email}`;
        cloneTemplateComment.querySelector('.comment__desc').textContent =row.body;
        
        commentsFragment.appendChild(cloneTemplateComment);
    })
    
    node.appendChild(commentsFragment);
}

async function getComments()
{
    
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    
    
    const data =await response.json();
    
    
    if(data){
        renderComment(data, elCommentsList);
    }
    
};

getComments();


elUsersList.addEventListener('click' ,(evt)=>{
    if(evt.target.matches('user__btn')) {
        getPosts(evt.target.matches('.user__btn').dataset.userId);
    }
    
})
