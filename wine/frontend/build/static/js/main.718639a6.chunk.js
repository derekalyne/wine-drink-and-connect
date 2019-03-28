(window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        31: function (e, t, a) {
            e.exports = a.p + "static/media/wine4.06e014f7.jpg"
        },
        36: function (e, t, a) {
            e.exports = a(61)
        },
        41: function (e, t, a) {},
        42: function (e, t, a) {},
        43: function (e, t, a) {},
        53: function (e, t, a) {
            e.exports = a.p + "static/media/square-purple-1.79c1998f.png"
        },
        54: function (e, t, a) {
            e.exports = a.p + "static/media/denys.2ae3f9ec.jpg"
        },
        55: function (e, t, a) {
            e.exports = a.p + "static/media/fabien-bazanegue.182796a2.jpg"
        },
        56: function (e, t, a) {
            e.exports = a.p + "static/media/mark-finn.3a749d18.jpg"
        },
        57: function (e, t, a) {
            e.exports = a.p + "static/media/dots.b81dabc0.png"
        },
        58: function (e, t, a) {
            e.exports = a.p + "static/media/path4.e37326c7.png"
        },
        59: function (e, t, a) {
            e.exports = a.p + "static/media/wine3.fc181e72.jpg"
        },
        61: function (e, t, a) {
            "use strict";
            a.r(t);
            var n = a(1),
                l = a.n(n),
                r = a(18),
                c = a.n(r),
                s = a(92),
                o = a(94),
                i = a(93),
                m = a(91),
                u = (a(41), a(42), a(43), a(11)),
                d = a(12),
                p = a(14),
                E = a(13),
                g = a(15),
                f = a(4),
                h = a.n(f),
                b = a(31),
                v = a.n(b),
                w = a(64),
                y = a(68),
                N = a(69),
                S = a(74),
                x = a(75),
                C = a(76),
                k = a(77),
                j = a(78),
                O = a(79),
                q = a(80),
                I = a(81),
                P = a(33),
                U = a(82),
                T = a(83),
                Y = a(73),
                W = a(66),
                D = a(63),
                F = a(65),
                L = a(67),
                V = a(70),
                G = a(71),
                B = a(72),
                A = function (e) {
                    function t(e) {
                        var a;
                        return Object(u.a)(this, t), (a = Object(p.a)(this, Object(E.a)(t).call(this, e))).changeColor = function () {
                            document.documentElement.scrollTop > 99 || document.body.scrollTop > 99 ? a.setState({
                                color: "bg-info"
                            }) : (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) && a.setState({
                                color: "navbar-transparent"
                            })
                        }, a.toggleCollapse = function () {
                            document.documentElement.classList.toggle("nav-open"), a.setState({
                                collapseOpen: !a.state.collapseOpen
                            })
                        }, a.onCollapseExiting = function () {
                            a.setState({
                                collapseOut: "collapsing-out"
                            })
                        }, a.onCollapseExited = function () {
                            a.setState({
                                collapseOut: ""
                            })
                        }, a.state = {
                            collapseOpen: !1,
                            color: "navbar-transparent"
                        }, a
                    }
                    return Object(g.a)(t, e), Object(d.a)(t, [{
                        key: "componentDidMount",
                        value: function () {
                            window.addEventListener("scroll", this.changeColor)
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            window.removeEventListener("scroll", this.changeColor)
                        }
                    }, {
                        key: "render",
                        value: function () {
                            return l.a.createElement(D.a, {
                                className: "fixed-top " + this.state.color,
                                "color-on-scroll": "100",
                                expand: "lg"
                            }, l.a.createElement(w.a, null, l.a.createElement("div", {
                                className: "navbar-translate"
                            }, l.a.createElement(F.a, {
                                "data-placement": "bottom",
                                to: "/",
                                rel: "noopener noreferrer",
                                title: "Designed and Coded by Creative Tim",
                                tag: W.a
                            }, l.a.createElement("span", null, "Wine!"), "Drink and Connect"), l.a.createElement("button", {
                                "aria-expanded": this.state.collapseOpen,
                                className: "navbar-toggler navbar-toggler",
                                onClick: this.toggleCollapse
                            }, l.a.createElement("span", {
                                className: "navbar-toggler-bar bar1"
                            }), l.a.createElement("span", {
                                className: "navbar-toggler-bar bar2"
                            }), l.a.createElement("span", {
                                className: "navbar-toggler-bar bar3"
                            }))), l.a.createElement(L.a, {
                                className: "justify-content-end " + this.state.collapseOut,
                                navbar: !0,
                                isOpen: this.state.collapseOpen,
                                onExiting: this.onCollapseExiting,
                                onExited: this.onCollapseExited
                            }, l.a.createElement("div", {
                                className: "navbar-collapse-header"
                            }, l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                className: "collapse-brand",
                                xs: "6"
                            }, l.a.createElement("a", {
                                href: "#pablo",
                                onClick: function (e) {
                                    return e.preventDefault()
                                }
                            }, "Wine!")), l.a.createElement(N.a, {
                                className: "collapse-close text-right",
                                xs: "6"
                            }, l.a.createElement("button", {
                                "aria-expanded": this.state.collapseOpen,
                                className: "navbar-toggler",
                                onClick: this.toggleCollapse
                            }, l.a.createElement("i", {
                                className: "tim-icons icon-simple-remove"
                            }))))), l.a.createElement(V.a, {
                                navbar: !0
                            }, l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, null, l.a.createElement("i", {
                                className: "fab fa-twitter"
                            }), l.a.createElement("p", {
                                className: "d-lg-none d-xl-none"
                            }, "Twitter"))), l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, null, l.a.createElement("i", {
                                className: "fab fa-facebook-square"
                            }), l.a.createElement("p", {
                                className: "d-lg-none d-xl-none"
                            }, "Facebook"))), l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, null, l.a.createElement("i", {
                                className: "fab fa-instagram"
                            }), l.a.createElement("p", {
                                className: "d-lg-none d-xl-none"
                            }, "Instagram"))), l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, {
                                tag: W.a,
                                to: "register-page"
                            }, "Log In or Register")), l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, {
                                tag: W.a,
                                to: "tables"
                            }, "Wine Collection")), l.a.createElement(G.a, {
                                className: "p-0"
                            }, l.a.createElement(B.a, {
                                tag: W.a,
                                to: "profile-page"
                            }, "Your Profile"))))))
                        }
                    }]), t
                }(l.a.Component),
                z = a(89),
                M = (l.a.Component, function (e) {
                    function t() {
                        var e, a;
                        Object(u.a)(this, t);
                        for (var n = arguments.length, l = new Array(n), r = 0; r < n; r++) l[r] = arguments[r];
                        return (a = Object(p.a)(this, (e = Object(E.a)(t)).call.apply(e, [this].concat(l)))).state = {
                            squares1to6: "",
                            squares7and8: "",
                            Password: "",
                            Username: "",
                            message: ""
                        }, a.followCursor = function (e) {
                            var t = e.clientX - window.innerWidth / 2,
                                n = e.clientY - window.innerWidth / 6;
                            a.setState({
                                squares1to6: "perspective(500px) rotateY(" + .05 * t + "deg) rotateX(" + -.05 * n + "deg)",
                                squares7and8: "perspective(500px) rotateY(" + .02 * t + "deg) rotateX(" + -.02 * n + "deg)"
                            })
                        }, a.login = function () {
                            var e = new FormData;
                            e.append("username", a.state.Username), e.append("password", a.state.Password), fetch("http://sp19-cs411-46.cs.illinois.edu:8000/api/login/", {
                                method: "POST",
                                body: e
                            }).then(function (e) {
                                return console.log(e), e.json()
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                return a.setState({
                                    message: "Success! Please wait till we redirect you to your profile page!"
                                }), console.log("Success:", e)
                            })
                        }, a.register = function () {
                            var e = new FormData;
                            e.append("username", a.state.Username), e.append("password", a.state.Password), fetch("http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/", {
                                method: "POST",
                                body: e
                            }).then(function (e) {
                                return console.log(e), e.json()
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                return a.setState({
                                    message: "Success! You can now update your personal info!"
                                }), console.log("Success:", e)
                            })
                        }, a
                    }
                    return Object(g.a)(t, e), Object(d.a)(t, [{
                        key: "componentDidMount",
                        value: function () {
                            document.body.classList.toggle("register-page"), document.documentElement.addEventListener("mousemove", this.followCursor)
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            document.body.classList.toggle("register-page"), document.documentElement.removeEventListener("mousemove", this.followCursor)
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this;
                            return l.a.createElement(l.a.Fragment, null, l.a.createElement(A, null), l.a.createElement("div", {
                                className: "wrapper"
                            }, l.a.createElement("div", {
                                className: "page-header"
                            }, l.a.createElement("div", {
                                className: "page-header-image"
                            }), l.a.createElement("div", {
                                className: "content"
                            }, l.a.createElement(w.a, null, l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                className: "offset-lg-0 offset-md-3",
                                lg: "5",
                                md: "6"
                            }, l.a.createElement("div", {
                                className: "square square-7",
                                id: "square7",
                                style: {
                                    transform: this.state.squares7and8
                                }
                            }), l.a.createElement("div", {
                                className: "square square-8",
                                id: "square8",
                                style: {
                                    transform: this.state.squares7and8
                                }
                            }), l.a.createElement(S.a, {
                                className: "card-register"
                            }, l.a.createElement(x.a, null, l.a.createElement(C.a, {
                                alt: "...",
                                src: a(53)
                            }), l.a.createElement(k.a, {
                                tag: "h4"
                            }, "Wine!")), l.a.createElement("p", {
                                style: {
                                    textAlign: "center"
                                }
                            }, this.state.message), l.a.createElement(j.a, null, l.a.createElement(O.a, {
                                className: "form"
                            }, l.a.createElement(q.a, {
                                className: h()({
                                    "input-group-focus": this.state.fullNameFocus
                                })
                            }, l.a.createElement(I.a, {
                                addonType: "prepend"
                            }, l.a.createElement(P.a, null, l.a.createElement("i", {
                                className: "tim-icons icon-single-02"
                            }))), l.a.createElement(U.a, {
                                placeholder: "Username",
                                type: "text",
                                onFocus: function (t) {
                                    return e.setState({
                                        fullNameFocus: !0
                                    })
                                },
                                onBlur: function (t) {
                                    return e.setState({
                                        fullNameFocus: !1
                                    })
                                },
                                value: this.state.Username,
                                onChange: function (t) {
                                    return e.setState({
                                        Username: t.target.value
                                    })
                                }
                            })), l.a.createElement(q.a, {
                                className: h()({
                                    "input-group-focus": this.state.passwordFocus
                                })
                            }, l.a.createElement(I.a, {
                                addonType: "prepend"
                            }, l.a.createElement(P.a, null, l.a.createElement("i", {
                                className: "tim-icons icon-lock-circle"
                            }))), l.a.createElement(U.a, {
                                placeholder: "Password",
                                type: "password",
                                onFocus: function (t) {
                                    return e.setState({
                                        passwordFocus: !0
                                    })
                                },
                                onBlur: function (t) {
                                    return e.setState({
                                        passwordFocus: !1
                                    })
                                },
                                value: this.state.Password,
                                onChange: function (t) {
                                    return e.setState({
                                        Password: t.target.value
                                    })
                                }
                            })))), l.a.createElement(T.a, null, l.a.createElement("div", {
                                style: {
                                    justifyContent: "space-around",
                                    display: "flex"
                                }
                            }, l.a.createElement(Y.a, {
                                className: "btn-round",
                                color: "primary",
                                size: "lg",
                                onClick: this.login
                            }, "Log In"), l.a.createElement(Y.a, {
                                className: "btn-round",
                                color: "primary",
                                size: "lg",
                                onClick: this.register
                            }, "Register")))))), l.a.createElement("div", {
                                className: "register-bg"
                            }), l.a.createElement("div", {
                                className: "square square-1",
                                id: "square1",
                                style: {
                                    transform: this.state.squares1to6
                                }
                            }, l.a.createElement("img", {
                                src: v.a
                            })), l.a.createElement("div", {
                                className: "square square-3",
                                id: "square3",
                                style: {
                                    transform: this.state.squares1to6
                                }
                            }), l.a.createElement("div", {
                                className: "square square-5",
                                id: "square5",
                                style: {
                                    transform: this.state.squares1to6
                                }
                            }), l.a.createElement("div", {
                                className: "square square-6",
                                id: "square6",
                                style: {
                                    transform: this.state.squares1to6
                                }
                            }))))))
                        }
                    }]), t
                }(l.a.Component)),
                _ = a(34),
                R = a(35),
                X = a(84),
                Z = a(85),
                J = a(86),
                Q = a(90),
                H = a(87),
                K = [{
                    src: a(54),
                    altText: "Slide 1",
                    caption: "Big City Life, United States"
                }, {
                    src: a(55),
                    altText: "Slide 2",
                    caption: "Somewhere Beyond, United States"
                }, {
                    src: a(56),
                    altText: "Slide 3",
                    caption: "Stocks, United States"
                }],
                $ = null,
                ee = function (e) {
                    function t(e) {
                        var a;
                        return Object(u.a)(this, t), (a = Object(p.a)(this, Object(E.a)(t).call(this, e))).UpdateUserInfo = function () {
                            var e = new FormData;
                            e.append("username", "ZoeVaughan"), e.append("name", a.state.name), e.append("password", a.state.password), e.append("gender", a.state.gender), e.append("password", a.state.password), e.append("age", a.state.age), fetch("http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/ZoeVaughan", {
                                method: "PUT",
                                body: e
                            }).then(function (e) {
                                return console.log(e), e.json()
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                return a.setState({
                                    message: "Success! You can now update your personal info!"
                                }), a.GetUserInfo(), console.log("Success:", e)
                            })
                        }, a.GetUserInfo = function () {
                            fetch("http://sp19-cs411-46.cs.illinois.edu:8000/api/drinkers/ZoeVaughan", {
                                method: "GET"
                            }).then(function (e) {
                                return console.log(e), e.json()
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                return a.setState({
                                    userinfo: e
                                }), console.log("Success:", e)
                            })
                        }, a.toggleTabs = function (e, t, n) {
                            e.preventDefault(), a.setState(Object(_.a)({}, t, n))
                        }, a.state = {
                            tabs: 1,
                            userinfo: {
                                name: "",
                                age: "",
                                gender: ""
                            },
                            name: "",
                            password: "",
                            gender: "",
                            age: ""
                        }, a
                    }
                    return Object(g.a)(t, e), Object(d.a)(t, [{
                        key: "componentDidMount",
                        value: function () {
                            if (this.GetUserInfo(), navigator.platform.indexOf("Win") > -1) {
                                document.documentElement.className += " perfect-scrollbar-on", document.documentElement.classList.remove("perfect-scrollbar-off");
                                for (var e = document.querySelectorAll(".table-responsive"), t = 0; t < e.length; t++) $ = new R.a(e[t])
                            }
                            document.body.classList.toggle("profile-page")
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            navigator.platform.indexOf("Win") > -1 && ($.destroy(), document.documentElement.className += " perfect-scrollbar-off", document.documentElement.classList.remove("perfect-scrollbar-on")), document.body.classList.toggle("profile-page")
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this;
                            return l.a.createElement(l.a.Fragment, null, l.a.createElement(A, null), l.a.createElement("div", {
                                className: "wrapper"
                            }, l.a.createElement("div", {
                                className: "page-header"
                            }, l.a.createElement("img", {
                                alt: "...",
                                className: "dots",
                                src: a(57)
                            }), l.a.createElement("img", {
                                alt: "...",
                                className: "path",
                                src: a(58)
                            }), l.a.createElement(w.a, {
                                className: "align-items-center"
                            }, l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                lg: "6",
                                md: "6"
                            }, l.a.createElement("h1", {
                                className: "profile-title text-left",
                                style: {
                                    fontSize: "150px"
                                }
                            }, this.state.userinfo.name), l.a.createElement("h5", {
                                className: "text-on-back"
                            }, "01")), l.a.createElement(N.a, {
                                className: "ml-auto mr-auto",
                                lg: "4",
                                md: "6"
                            }, l.a.createElement(S.a, {
                                className: "card-coin card-plain"
                            }, l.a.createElement(x.a, null, l.a.createElement("img", {
                                alt: "...",
                                className: "img-center img-fluid rounded-circle",
                                src: a(59)
                            }), l.a.createElement("h4", {
                                className: "title"
                            }, "Personal Profile")), l.a.createElement(j.a, null, l.a.createElement(V.a, {
                                className: "nav-tabs-primary justify-content-center",
                                tabs: !0
                            }, l.a.createElement(G.a, null, l.a.createElement(B.a, {
                                className: h()({
                                    active: 1 === this.state.tabs
                                }),
                                onClick: function (t) {
                                    return e.toggleTabs(t, "tabs", 1)
                                },
                                href: "#pablo"
                            }, "Basic Info")), l.a.createElement(G.a, null, l.a.createElement(B.a, {
                                className: h()({
                                    active: 3 === this.state.tabs
                                }),
                                onClick: function (t) {
                                    return e.toggleTabs(t, "tabs", 3)
                                },
                                href: "#pablo"
                            }, "Favorite Wine"))), l.a.createElement(X.a, {
                                className: "tab-subcategories",
                                activeTab: "tab" + this.state.tabs
                            }, l.a.createElement(Z.a, {
                                tabId: "tab1"
                            }, l.a.createElement(J.a, {
                                className: "tablesorter",
                                responsive: !0
                            }, l.a.createElement("tbody", null, l.a.createElement("tr", null, l.a.createElement("td", null, "Name"), l.a.createElement("td", null, this.state.userinfo.name)), l.a.createElement("tr", null, l.a.createElement("td", null, "Age"), l.a.createElement("td", null, this.state.userinfo.age)), l.a.createElement("tr", null, l.a.createElement("td", null, "Gender"), l.a.createElement("td", null, this.state.userinfo.gender))))), l.a.createElement(Z.a, {
                                tabId: "tab3"
                            }, l.a.createElement(J.a, {
                                className: "tablesorter",
                                responsive: !0
                            }, l.a.createElement("thead", {
                                className: "text-primary"
                            }, l.a.createElement("tr", null, l.a.createElement("th", {
                                className: "header"
                            }, "Your favorite wine collections"))), l.a.createElement("tbody", null, l.a.createElement("tr", null, l.a.createElement("td", null, "Point Noir")), l.a.createElement("tr", null, l.a.createElement("td", null, "Rose")), l.a.createElement("tr", null, l.a.createElement("td", null, "Cola")))))))))))), l.a.createElement("div", {
                                className: "section"
                            }, l.a.createElement(w.a, null, l.a.createElement(y.a, {
                                className: "justify-content-between"
                            }, l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(y.a, {
                                className: "justify-content-between align-items-center"
                            }, l.a.createElement(Q.a, {
                                items: K
                            }))), l.a.createElement(N.a, {
                                md: "5"
                            }, l.a.createElement("h1", {
                                className: "profile-title text-left"
                            }, "Placeholder for user's favorite wine review"), l.a.createElement("h5", {
                                className: "text-on-back"
                            }, "02"), l.a.createElement("p", {
                                className: "profile-description text-left"
                            }, "This wine is so good I want to cry. Shut up and buy me some more."))))), l.a.createElement("section", {
                                className: "section"
                            }, l.a.createElement(w.a, null, l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(S.a, {
                                className: "card-plain"
                            }, l.a.createElement(x.a, null, l.a.createElement("h1", {
                                className: "profile-title text-left"
                            }, "Update your Info"), l.a.createElement("h5", {
                                className: "text-on-back"
                            }, "03")), l.a.createElement(j.a, null, l.a.createElement(O.a, null, l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(H.a, null, l.a.createElement("label", null, "Your Name"), l.a.createElement(U.a, {
                                value: this.state.name,
                                onChange: function (t) {
                                    return e.setState({
                                        name: t.target.value
                                    })
                                }
                            }))), l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(H.a, null, l.a.createElement("label", null, "Password"), l.a.createElement(U.a, {
                                type: "password",
                                value: this.state.password,
                                onChange: function (t) {
                                    return e.setState({
                                        password: t.target.value
                                    })
                                }
                            })))), l.a.createElement(y.a, null, l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(H.a, null, l.a.createElement("label", null, "Age"), l.a.createElement(U.a, {
                                value: this.state.age,
                                onChange: function (t) {
                                    return e.setState({
                                        age: t.target.value
                                    })
                                }
                            }))), l.a.createElement(N.a, {
                                md: "6"
                            }, l.a.createElement(H.a, null, l.a.createElement("label", null, "Gender"), l.a.createElement(U.a, {
                                value: this.state.gender,
                                onChange: function (t) {
                                    return e.setState({
                                        gender: t.target.value
                                    })
                                }
                            })))), l.a.createElement(Y.a, {
                                className: "btn-round float-right",
                                color: "primary",
                                "data-placement": "right",
                                id: "tooltip341148792",
                                type: "button",
                                onClick: this.UpdateUserInfo
                            }, "Update"), l.a.createElement(z.a, {
                                delay: 0,
                                placement: "right",
                                target: "tooltip341148792"
                            }, "Click to update your info!"))))))))))
                        }
                    }]), t
                }(l.a.Component),
                te = a(88),
                ae = function (e) {
                    function t(e) {
                        var a;
                        return Object(u.a)(this, t), (a = Object(p.a)(this, Object(E.a)(t).call(this, e))).fetchData = function () {
                            var e = "http://sp19-cs411-46.cs.illinois.edu:8000/api/wines/?page=&winery=".concat(a.state.winery, "&year_gt=").concat(a.state.wineYearl, "&year_lt=").concat(a.state.wineYearh, "&variety&price_gt=").concat(a.state.pricel, "&price_lt=").concat(a.state.priceh, "&designation&name=").concat(a.state.winesel, "&page=").concat(a.state.page);
                            fetch(e, {
                                method: "GET"
                            }).then(function (e) {
                                return console.log(e), e.json()
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                return a.setState({
                                    tableData: e
                                }), console.log("Success:", e)
                            })
                        }, a.state = {
                            tableData: {
                                data: []
                            },
                            winesel: "",
                            winery: "",
                            wineYearl: "",
                            wineYearh: "",
                            pricel: "",
                            priceh: "",
                            page: 1,
                            pageprev: 0,
                            pagenext: 0
                        }, a
                    }
                    return Object(g.a)(t, e), Object(d.a)(t, [{
                        key: "componentDidMount",
                        value: function () {
                            this.fetchData(), this.setState({
                                pagenext: this.state.page + 1
                            }), this.setState({
                                pageprev: this.state.page - 1
                            })
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this,
                                t = this.state.tableData.data.map(function (e) {
                                    return l.a.createElement("tr", {
                                        key: e.wid
                                    }, l.a.createElement("td", {
                                        width: "25%"
                                    }, e.name), l.a.createElement("td", {
                                        width: "25%"
                                    }, e.winery), l.a.createElement("td", {
                                        width: "10%"
                                    }, e.year), l.a.createElement("td", {
                                        width: "10%"
                                    }, e.price), l.a.createElement("img", {
                                        width: "100%",
                                        src: "http://".concat(e.image1)
                                    }))
                                });
                            return l.a.createElement(l.a.Fragment, null, l.a.createElement(A, null), l.a.createElement("div", {
                                style: {
                                    margin: 20
                                },
                                className: "section section-basic"
                            }, l.a.createElement("div", {
                                className: "container-fluid"
                            }, l.a.createElement(O.a, {
                                className: "form"
                            }, l.a.createElement(H.a, {
                                controlId: "wineQuery"
                            }, l.a.createElement(te.a, null, "Wine selection:"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "Pinot Noir",
                                type: "text",
                                name: "winesel",
                                value: this.state.winesel,
                                onChange: function (t) {
                                    return e.setState({
                                        winesel: t.target.value
                                    })
                                }
                            })), l.a.createElement(H.a, {
                                controlId: "wineWinery"
                            }, l.a.createElement(te.a, null, "Wine winery:"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "Sweet Cheeks",
                                type: "text",
                                name: "winery",
                                value: this.state.winery,
                                onChange: function (t) {
                                    return e.setState({
                                        winery: t.target.value
                                    })
                                }
                            })), l.a.createElement(H.a, {
                                controlId: "wineYear"
                            }, l.a.createElement(te.a, null, " Wine year (low):"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "1997",
                                type: "text",
                                name: "wineYear",
                                value: this.state.wineYear,
                                onChange: function (t) {
                                    return e.setState({
                                        wineYearl: t.target.value
                                    })
                                }
                            })), l.a.createElement(H.a, {
                                controlId: "wineYear"
                            }, l.a.createElement(te.a, null, " Wine year (high):"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "1997",
                                type: "text",
                                name: "wineYear",
                                value: this.state.wineYear,
                                onChange: function (t) {
                                    return e.setState({
                                        wineYearh: t.target.value
                                    })
                                }
                            })), l.a.createElement(H.a, {
                                controlId: "winePrice"
                            }, l.a.createElement(te.a, null, " Wine price (low):"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "75",
                                type: "text",
                                name: "price",
                                value: this.state.pricel,
                                onChange: function (t) {
                                    return e.setState({
                                        pricel: t.target.value
                                    })
                                }
                            })), l.a.createElement(H.a, {
                                controlId: "winePrice"
                            }, l.a.createElement(te.a, null, " Wine price (high):"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "75",
                                type: "text",
                                name: "price",
                                value: this.state.priceh,
                                onChange: function (t) {
                                    return e.setState({
                                        priceh: t.target.value
                                    })
                                }
                            }))), l.a.createElement(Y.a, {
                                type: "button",
                                onClick: function () {
                                    return e.fetchData()
                                }
                            }, "Submit")), l.a.createElement("div", {
                                style: {
                                    margin: 20
                                }
                            }), l.a.createElement("div", {
                                className: "container-fluid"
                            }, l.a.createElement("table", null, l.a.createElement("tr", null, l.a.createElement("th", {
                                width: "25%"
                            }, " Name"), l.a.createElement("th", {
                                width: "25%"
                            }, " Winery"), l.a.createElement("th", {
                                width: "10%"
                            }, " Year"), l.a.createElement("th", {
                                width: "10%"
                            }, " Price"), l.a.createElement("th", {
                                width: "100%"
                            }, "Image")), t)), l.a.createElement("div", {
                                style: {
                                    margin: 20
                                },
                                className: "section section-basic"
                            }, l.a.createElement("div", {
                                className: "container-fluid"
                            }, l.a.createElement(O.a, {
                                className: "pagination"
                            }, l.a.createElement(H.a, {
                                controlId: "wineQuery"
                            }, l.a.createElement(te.a, null, "Page:"), l.a.createElement(U.a, {
                                defaultValue: "",
                                placeholder: "enter a number",
                                type: "text",
                                name: "currPage",
                                value: this.state.page,
                                onChange: function (t) {
                                    return e.setState({
                                        page: t.target.value
                                    })
                                }
                            }))), l.a.createElement(Y.a, {
                                type: "button",
                                onClick: function () {
                                    return e.fetchData()
                                }
                            }, "Submit")))))
                        }
                    }]), t
                }(l.a.Component);
            c.a.render(l.a.createElement(s.a, null, l.a.createElement(o.a, null, l.a.createElement(i.a, {
                path: "/welcome/register-page",
                render: function (e) {
                    return l.a.createElement(M, e)
                }
            }), l.a.createElement(i.a, {
                path: "/welcome/profile-page",
                render: function (e) {
                    return l.a.createElement(ee, e)
                }
            }), l.a.createElement(i.a, {
                path: "/welcome/tables",
                render: function (e) {
                    return l.a.createElement(ae, e)
                }
            }), l.a.createElement(m.a, {
                to: "/welcome/register-page"
            }))), document.getElementById("root"))
        }
    },
    [
        [36, 1, 2]
    ]
]);
//# sourceMappingURL=main.718639a6.chunk.js.map