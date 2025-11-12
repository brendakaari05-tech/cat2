document.addEventListener('DOMContentLoaded', () => {
    //slider part for images to slide
    const slider=document.querySelector('.slider');
    const prevBtn=document.querySelector('.prev');
    const nextBtn=document.querySelector('.next');
if(slider && prevBtn && nextBtn){
    let index=0;
    const slides=slider.children.length;
    const slideWidth=slider.children[0].getBoundingClientRect().width;

    prevBtn.addEventListener('click', () => {
        index--;
        if(index<0) index=slides-1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        index++;
        if(index>=slides) index=0;
        updateSlider();
    });

    function updateSlider() {
        slider.style.transform=`translateX(${-index * slideWidth}px)`;
    }

    setInterval(() => {
        index++;
        if(index>=slides) index=0;
        updateSlider();
    }, 3000);
}

    //logout functionality
    const logoutBtn=document.getElementById('logout');
    if(logoutBtn){
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            window.location.href='index.html';
        });
    }

    //register form
    const registerForm=document.getElementById('register-form');
    if(registerForm){
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullname=document.getElementById("fullname").value.trim();
            const email=document.getElementById("email").value.trim();
            const password=document.getElementById("password").value.trim();
            const message=document.getElementById("register-message");

            if(!fullname || !email || !password){
                if(message){
                    message.textContent="Please fill in all fields.";
                    message.style.color="red";
                }
                return;
            }

            const user = { fullname, email, password};
            localStorage.setItem('userRegistered', JSON.stringify(user));

            if(message){
                message.textContent=`Registration successful for ${fullname}!`;
                message.style.color="green";
            }

            registerForm.reset();

            setTimeout(() => {
                window.location.href='index.html';
            }, 2000);
        });
    }

    //login form
    const loginForm=document.getElementById('login-form');
    if(loginForm){
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email=document.getElementById("email").value.trim();
            const password=document.getElementById("password").value.trim();
            const message=document.getElementById("login-message");

            const registeredUser=JSON.parse(localStorage.getItem('userRegistered'));
            if(!registeredUser){
                if(message){
                    message.textContent="No registered user found. Please register first.";
                    message.style.color="red";
                }
                return;
            }
            if(email===registeredUser.email && password===registeredUser.password){
                message.textContent=`Login successful! Welcome ${registeredUser.fullname}!`;
                message.style.color="green";
                loginForm.reset();
                localStorage.setItem("userLoggedIn", JSON.stringify(registeredUser));

                setTimeout(() => {
                    window.location.href='home.html';
                }, 2000);
            }else{
                if(message){
                    message.textContent="Invalid email or password.";
                    message.style.color="red";
                }
            }
        });
    }

});
