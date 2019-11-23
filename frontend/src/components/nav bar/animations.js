window.addEventListener("resize", () => {
    console.log(window.innerWidth);
});

document.body.addEventListener("scroll", () => {
    var nav = document.getElementById("nav-bar");
    if (nav != null) {
        if (document.body.scrollTop > 0) {
            nav.style.backgroundColor = "rgb(38, 19, 80)";
            nav.style.boxShadow = "0 0 4px 2px rgba(0, 0, 0, 0.5)";
        } else {
            nav.style.backgroundColor = "rgb(0, 0, 0, 0.6)";
            nav.style.boxShadow = "none";
        }
        if (document.body.scrollTop >= 80) {
            nav.style.minHeight = "60px";
        }
        if (document.body.scrollTop <= 30) {
            nav.style.minHeight = "120px";
        }
    }
});
