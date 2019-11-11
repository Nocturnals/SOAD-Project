window.addEventListener("resize", () => {
    console.log(window.innerWidth);
});

var scrollHeight = 0;
document.body.addEventListener("scroll", () => {
    var nav = document.getElementById("nav-bar");
    if (nav != null) {
        if (document.body.scrollTop > 0) {
            nav.style.backgroundColor = "rgb(38, 19, 80)";
            nav.style.boxShadow = "0 0 4px 2px rgba(0, 0, 0, 0.5)";
        } else {
            nav.style.backgroundColor = "rgb(0, 0, 0, 0.8)";
            nav.style.boxShadow = "none";
        }
        if (document.body.scrollTop >= 80) {
            nav.style.minHeight = "60px";
            if (scrollHeight < document.body.scrollTop - 30) {
                nav.style.top = "-80px";
            }
        }
        if (document.body.scrollTop <= 30) {
            nav.style.minHeight = "120px";
        }
        if (scrollHeight > document.body.scrollTop) {
            nav.style.top = "0px";
        }
        scrollHeight = document.body.scrollTop;
    }
});

export function toggleNavBar() {
    return () => {
        var expandedNav = document.getElementById("navbarSupportedContent-333");
        var nav = document.getElementById("nav-bar");
        console.log(expandedNav.style);

        if (expandedNav.style.display !== "none") {
            if (document.body.scrollTop === 0) {
                nav.style.backgroundColor = "rgb(0, 0, 0, 0.8)";
            }
        } else {
            nav.style.backgroundColor = "rgb(38, 19, 80)";
        }
    };
}
