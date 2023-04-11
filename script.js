const openBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.cancel');
const navList = document.querySelectorAll('.nav')
const project = document.getElementById('project');
const toggle = document.getElementById('toggle');
const toggleClass= document.getElementsByClassName('toggle');
const About = document.querySelector('.about-container')
const AboutBtn = document.getElementById('About-btn');
const AboutCancel = document.getElementById('about-close')
const main = document.getElementById('main');
const contactBtn = document.getElementById('contact-btn');
const contact = document.querySelector('.contact-container');
const contactCancel = document.getElementById('contact-close');
const stackBtn = document.getElementById('stack-btn');
const stack = document.querySelector('.stack-container');
const stackCancel = document.getElementById('stack-close')
 const header = document.getElementById('header');
 const footer = document.getElementById('footer');
 const projectNav = document.getElementById('project-nav');

openBtn.addEventListener('click', () =>{
    navList.forEach(navListEl =>{
        navListEl.classList.add('visible')
    })
    footer.style.display = 'none'
})
closeBtn.addEventListener('click', () =>{
    projectNav.style.display = "none"
    navList.forEach(navListEl =>{
        navListEl.classList.remove('visible')
    })
    footer.style.display = 'block'
    toggle.classList.remove('toggle')
})

project.addEventListener('click', () =>{
    toggle.classList.toggle('toggle')
   projectNav.style.display = "block"
})
const openbtnFunction = () =>{
    navList.forEach(navListEl =>{
        navListEl.classList.remove('visible')
    })
    main.style.opacity= '0';
    header.style.opacity = '0'
};
const closeBtnFunction = () => {
    navList.forEach(navListEl =>{
        navListEl.classList.add('visible')
    })
    main.style.opacity= '1';
    header.style.opacity = '1'
}

AboutBtn.addEventListener('click', () =>{
    openbtnFunction()
    About.style.display ="block"
})
AboutCancel.addEventListener('click', ()=>{
   closeBtnFunction()
    About.style.display ="none"
})
contactBtn.addEventListener('click', () =>{
    openbtnFunction()
    contact.style.display ="block"
})
contactCancel.addEventListener('click', ()=>{
    closeBtnFunction()
    contact.style.display ="none"
})
stackBtn.addEventListener('click', () =>{
    openbtnFunction()
    stack.style.display ="block"
})
stackCancel.addEventListener('click', ()=>{
   closeBtnFunction()
    stack.style.display ="none"
})
projectNav.addEventListener('click', ()=> {
    toggle.classList.toggle('toggle')
})
// console.log(pos)
