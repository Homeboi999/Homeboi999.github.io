{
    function scroll () {
        if (window.scrollY > 0) {
            document.getElementById ("main-header").classList.add ("scrolled");
        } else {
            document.getElementById ("main-header").classList.remove ("scrolled");
        }

        window.requestAnimationFrame (scroll);
    }

    scroll ();
}

{
    var tabs = document.getElementById ("tab-bar");
    var pages = document.getElementsByClassName ("page");
    var animateTimeout;

    function paginate () {
        window.clearTimeout (animateTimeout);
        var prevPage = document.getElementsByClassName ("page selected")[0];
        var page = document.getElementById ("page-" + (parseInt (tabs.selected) + 1));
        for (var index = 0; index < pages.length; index++) {
            pages[index].classList.remove ("selected");
            pages[index].classList.remove ("hidden");
        }
        window.setTimeout (() => {
            if (page) {
                page.classList.add ("selected");
            }
            animateTimeout = window.setTimeout (() => {
                for (var index = 0; index < pages.length; index++) {
                    if (!pages[index].classList.contains ("selected")) {
                        pages[index].classList.add ("hidden");
                    }
                }
            }, 550);
            window.scroll (0, 0);
        }, 1);
    }

    tabs.addEventListener ("iron-select", paginate);
    paginate ();
}
