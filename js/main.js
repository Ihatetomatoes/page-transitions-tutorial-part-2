function init(){
    
    const loader = document.querySelector('.loader');

    // reset loader to be invisible on page load
    gsap.set('.loader', {scale: 0});

    function loaderIn(trigger) {

        // console.log(trigger.getBoundingClientRect());
        const { height, width, top, left } = trigger.getBoundingClientRect();
        const triggerTop = Math.floor(top);
        const triggerLeft = Math.floor(left);
        const triggerWidth = Math.floor(width);
        const triggerHeight = Math.floor(height);
        // console.log({triggerTop, triggerLeft, triggerHeight, triggerWidth});

        // GSAP timeline to stretch the loading screen across the whole screen
        const tl = gsap.timeline();
        tl
            .set(loader, {
                autoAlpha: 1,
                x: triggerLeft + (triggerWidth/2),
                y: triggerTop + (triggerHeight/2),
                xPercent: -50,
                yPercent: -50,
                scale: 0
            })
            .fromTo(loader, 
            {
                scale: 0,
                transformOrigin: 'center center'
            },
            { 
                duration: 0.8,
                scale: 23, 
                ease: 'Power4.out'
            });
        return tl;
    }

    function loaderAway(next) {
        document.body.removeAttribute('class');
        document.body.classList.add(next.container.dataset.class);

        // const bodyClass = trigger.dataset.class;
        // console.log(bodyClass);
        // GSAP tween to hide the loading screen
        // maybe a different effect for the reveal?
        const h1 = next.container.querySelector('h1');
        const p = next.container.querySelectorAll('p');
        const img = next.container.querySelector('img');

        const tl = gsap.timeline();
        return tl.to(loader, { 
            duration: 1, 
            scaleX: 15, 
            scaleY: 7, 
            yPercent: 2000, 
            ease: 'Power4.inOut'
        }).fromTo([h1, p, img], {
            autoAlpha: 0
        }, {
            duration: 0.9, 
            autoAlpha: 1, 
            stagger: 0.02, 
            ease: 'none'}, 
        0.3);
    }

    // do something before the transition starts
    barba.hooks.before(() => {

        document.querySelector('html').classList.add('is-transitioning');

    });

    // do something after the transition finishes
    barba.hooks.after(() => {

        document.querySelector('html').classList.remove('is-transitioning');

    });

    // scroll to the top of the page
    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

    });

    barba.init({
        transitions: [{
            async leave({trigger}) {
                await loaderIn(trigger);
        
            },
            enter({next}) {
                loaderAway(next);
            }
        }]
    })

}

window.addEventListener('load', function(){
    init();
});
