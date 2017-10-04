"use strict";

{
    var scroll = function scroll() {
        if (window.scrollY > 0) {
            document.getElementById("main-header").classList.add("scrolled");
        } else {
            document.getElementById("main-header").classList.remove("scrolled");
        }

        window.requestAnimationFrame(scroll);
    };

    scroll();
}

{
    var paginate = function paginate() {
        window.clearTimeout(animateTimeout);
        var prevPage = document.getElementsByClassName("page selected")[0];
        var page = document.getElementById("page-" + (parseInt(tabs.selected) + 1));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = pages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _page = _step.value;

                _page.classList.remove("selected");
                _page.classList.remove("hidden");
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        window.setTimeout(function () {
            if (page) {
                page.classList.add("selected");
            }
            animateTimeout = window.setTimeout(function () {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = pages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _page2 = _step2.value;

                        if (!_page2.classList.contains("selected")) {
                            _page2.classList.add("hidden");
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }, 550);
            window.scroll(0, 0);
        }, 1);
    };

    // TODO: Add pagination via hash

    var tabs = document.getElementById("tab-bar");
    var pages = document.getElementsByClassName("page");
    var animateTimeout = void 0;

    tabs.addEventListener("iron-select", paginate);
    paginate();
}

{
    (function () {
        var projectElements = document.querySelectorAll(".projects-card section");
        var popoutButtons = document.querySelectorAll(".projects-card section .right-buttons .popup-button");
        var modal = document.getElementById("modal-dialog");
        modal.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        console.log(popoutButtons);

        var _loop = function _loop(index) {
            popoutButtons[index].addEventListener("click", function () {
                // Browser compatibility
                if (!("content" in document.createElement("template"))) {
                    console.error("Template element not supported");
                    return;
                }

                var template = projectElements[index].getElementsByClassName("modal-content")[0];

                // Clear contents and classes of #modal-dialog
                modal.className = "";
                while (modal.firstChild) {
                    modal.removeChild(modal.firstChild);
                }

                // Set the content
                modal.appendChild(document.importNode(template.content, true));

                // Set the classes
                modal.className = template.getAttribute("data-class");

                // Show the dialog
                document.getElementById("overlay").classList.add("show");
            });
        };

        for (var index = 0; index < popoutButtons.length; index++) {
            _loop(index);
        }

        document.getElementById("overlay").addEventListener("click", function () {
            document.getElementById("overlay").classList.remove("show");
        });
    })();
}