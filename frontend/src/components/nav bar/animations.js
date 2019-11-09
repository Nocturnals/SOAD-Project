window.addEventListener('resize', () => {
    var expandedNav = document.getElementById('expandedNav');
    var nav = document.getElementById('nav-bar');
    if (window.innerWidth >= 1075 && expandedNav) {
        expandedNav.style.display = 'none';
        document.body.style.overflowY = 'scroll';
        if (document.body.scrollTop === 0) {
            nav.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';
        }
    }
})

var scrollHeight = 0;
document.body.addEventListener('scroll', () => {
    var nav = document.getElementById('nav-bar');
    if (document.body.scrollTop > 0) {
        nav.style.backgroundColor = 'rgb(38, 19, 80)';
        nav.style.boxShadow = '0 0 4px 2px rgba(0, 0, 0, 0.5)';
    }
    else {
        nav.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';
        nav.style.boxShadow = 'none';
    }
    if (document.body.scrollTop >= 100) {
        nav.style.paddingTop = '10px';
        if (scrollHeight < document.body.scrollTop - 30) {
            nav.style.top = '-50px';
        }
    }
    if (document.body.scrollTop <= 60) {
        nav.style.paddingTop = '40px';
    }
    if (scrollHeight > document.body.scrollTop) {
        nav.style.top = '0px';
    }
    scrollHeight = document.body.scrollTop;
})

// Animations...
export function toggleNavBar() {
    return () => {
        var expandedNav = document.getElementById('expandedNav');
        var nav = document.getElementById('nav-bar');
        if (expandedNav.style.display === 'block') {
            expandedNav.style.display = 'none';
            if (document.body.scrollTop === 0) {
                nav.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';
            }
        }
        else {
            expandedNav.style.display = 'block';
            nav.style.backgroundColor = 'rgb(38, 19, 80)';
        }
        if (expandedNav.style.display === 'block') {
            document.body.style.overflowY = 'hidden';
        }
        else {
            document.body.style.overflowY = 'scroll';
        }
    }
}

export function enableBodyScroll() {
    document.body.style.overflowY = 'scroll';
}

export default toggleNavBar;
