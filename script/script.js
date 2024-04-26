//Modo escuro
const modoEscuro = document.querySelector('#modoEscuro');

modoEscuro.addEventListener('change', () => {
    document.body.classList.toggle('dark')
});


//Menu 
let menu = document.querySelector('#menuIcon');
let links = document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    links.classList.toggle('open');

};

window.onscroll = () => {
    menu.classList.remove ('bx-x');
    links.classList.remove('open');
}


//Animação aparecer elementos no scroll
const animacao = document.querySelector('.animacao');

const animation = new IntersectionObserver( (funcaoAnimation) => {
    funcaoAnimation.forEach( (funcaoShow) => {
        if(funcaoShow.isIntersecting){
            funcaoShow.target.classList.add('show')
        }else{
            funcaoShow.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.animacao');

elements.forEach((element) => animation.observe(element));



//Carrossel
const wrapper = document.querySelector('.wrapper');
const carrossel = document.querySelector('.carrossel');
const carrosselButton = document.querySelectorAll('.wrapper i');
const firstCardWidth = carrossel.querySelector('.card').offsetWidth;
const carroselChildrens = [...carrossel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carrossel.offsetWidth / firstCardWidth);

carroselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carrossel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carroselChildrens.slice(0, cardPerView).forEach(card => {
    carrossel.insertAdjacentHTML('beforeend', card.outerHTML);
});

carrosselButton.forEach(btn => {
    btn.addEventListener('click', () => {
        carrossel.scrollLeft += btn.id === 'left' ? - firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carrossel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carrossel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carrossel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carrossel.classList.remove('dragging');
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carrossel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if(carrossel.scrollLeft == 0){
        carrossel.classList.add('no-transition');
        carrossel.scrollLeft = carrossel.scrollWidth - ( 2 * carrossel.offsetWidth);
        carrossel.classList.remove('no-transition');

    }else if(Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth){
        carrossel.classList.add('no-transition');
        carrossel.scrollLeft = carrossel.offsetWidth;
        carrossel.classList.remove('no-transition');
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(':hover')) autoPlay();
}

carrossel.addEventListener('mousedown', dragStart);
carrossel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carrossel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoPlay);