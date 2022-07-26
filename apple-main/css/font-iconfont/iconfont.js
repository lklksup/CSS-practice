(function(window) {
    var svgSprite = '<svg><symbol id="icon-bag" viewBox="0 0 1024 1024"><path d="M512 2.5e-05q43.335679 0 82.841598 16.9984t67.993598 45.506559 45.506559 67.993598 16.9984 82.841598l0 42.659839 170.659836 0 0 639.999985q0 53.002239-37.498879 90.501118t-90.501118 37.498879l-511.999988 0q-53.002239 0-90.501118-37.498879t-37.498879-90.501118l0-639.999985 170.659836 0 0-42.659839q0-43.335679 16.9984-82.841598t45.506559-67.993598 67.993598-45.506559 82.841598-16.9984zM810.659833 896.000003l0-554.659827-597.340146 0 0 554.659827q0 17.67424 12.4928 30.167039t30.167039 12.4928l511.999988 0q17.67424 0 30.167039-12.4928t12.4928-30.167039zM512 85.340183q-53.002239 0-90.501118 37.498879t-37.498879 90.501118l0 42.659839 255.999994 0 0-42.659839q0-53.002239-37.498879-90.501118t-90.501118-37.498879z"  ></path></symbol></svg>';
    var script = function() {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1]
    } ();
    var shouldInjectCss = script.getAttribute("data-injectcss");
    var ready = function(fn) {
        if (document.addEventListener) {
            if (~ ["complete", "loaded", "interactive"].indexOf(document.readyState)) {
                setTimeout(fn, 0)
            } else {
                var loadFn = function() {
                    document.removeEventListener("DOMContentLoaded", loadFn, false);
                    fn()
                };
                document.addEventListener("DOMContentLoaded", loadFn, false)
            }
        } else if (document.attachEvent) {
            IEContentLoaded(window, fn)
        }
        function IEContentLoaded(w, fn) {
            var d = w.document,
            done = false,
            init = function() {
                if (!done) {
                    done = true;
                    fn()
                }
            };
            var polling = function() {
                try {
                    d.documentElement.doScroll("left")
                } catch(e) {
                    setTimeout(polling, 50);
                    return
                }
                init()
            };
            polling();
            d.onreadystatechange = function() {
                if (d.readyState == "complete") {
                    d.onreadystatechange = null;
                    init()
                }
            }
        }
    };
    var before = function(el, target) {
        target.parentNode.insertBefore(el, target)
    };
    var prepend = function(el, target) {
        if (target.firstChild) {
            before(el, target.firstChild)
        } else {
            target.appendChild(el)
        }
    };
    function appendSvg() {
        var div, svg;
        div = document.createElement("div");
        div.innerHTML = svgSprite;
        svgSprite = null;
        svg = div.getElementsByTagName("svg")[0];
        if (svg) {
            svg.setAttribute("aria-hidden", "true");
            svg.style.position = "absolute";
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = "hidden";
            prepend(svg, document.body)
        }
    }
    if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
        window.__iconfont__svg__cssinject__ = true;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch(e) {
            console && console.log(e)
        }
    }
    ready(appendSvg)
})(window)