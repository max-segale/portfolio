// init page components
(function (window, document, max) {
    'use strict';
    var loadReady = false,
        focusPNum = 0,
        projects = [],
        focusInfoBox = {},
        oldScroll = {},
        nav = null,
        msgForm = null,
        msgStatus = null,
        gallery = {};

    function setImgBoxSize(pNum, imgWidth, imgHeight) {
        var projObj = projects[pNum],
            totalWidth = projObj.boxImg.offsetWidth,
            imgViewW = (
                imgWidth > totalWidth
                ? totalWidth
                : imgWidth
            ),
            imgViewH = imgHeight * totalWidth / imgWidth,
            resizePctObj = max.relativeSize(imgViewW, imgViewH, totalWidth);
        // set px width
        projObj.boxImgView.style.maxWidth = imgWidth + 'px';

        // set % height relative to width for auto resize
        //projObj.boxImages.style.paddingBottom = resizePctObj.height + '%';
    }

    function changeImg(pNum, moveType) {
        var projObj = projects[pNum],
            imgNum = projObj.imgFocus,
            imgMax = projObj.images.length - 1,
            newImg,
            newWidth,
            newHeight;
        // check for current image
        if (imgNum !== null) {
            max.subClass(projObj.images[imgNum].img, 'focus');
            max.subClass(projObj.thumbs[imgNum], 'selected');
        }
        // find new image number
        if (moveType === 'next') {
            imgNum = (
                imgNum === imgMax
                ? 0
                : imgNum + 1
            );
        } else if (moveType === 'prev') {
            imgNum = (
                imgNum === 0
                ? imgMax
                : imgNum - 1
            );
        } else if (!Number.isNaN(moveType)) {
            imgNum = moveType;
        }
        projObj.imgFocus = imgNum;
        // show new image
        newImg = projObj.images[imgNum].img;
        max.addClass(newImg, 'focus');
        if (projObj.thumbs.length > 0) {
            max.addClass(projObj.thumbs[imgNum], 'selected');
        }
        // update number and caption displays
        if (projObj.currentNumDisplay) {
            projObj.currentNumDisplay.innerHTML = imgNum + 1;
        }
        if (projObj.captionDisplay) {
            projObj.captionDisplay.innerHTML = newImg.alt;
        }
        // set images box size
        newWidth = projObj.images[imgNum].width;
        newHeight = projObj.images[imgNum].height;
        setImgBoxSize(pNum, newWidth, newHeight);
    }

    function createThumbImg(imgObj, imgNum, pNum) {
        var thumbImg = max.addKid(false, 'li', {
            style: {
                backgroundImage: 'url("' + imgObj.link + '")'
            }
        });
        // add navigation events
        max.addEvent(thumbImg, 'click', function () {
            changeImg(pNum, imgNum);
        });
        // add thumbnail to project object
        projects[pNum].thumbs[imgNum] = thumbImg;
        return thumbImg;
    }

    function createImgNav(pImages, pNum) {
        var totalTxt = ' of ' + pImages.length,
            navBox = max.addKid(false, 'div', 'img_nav'),
            prevBtn = max.addKid(navBox, 'div', 'img_nav_button prev'),
            nextBtn = max.addKid(navBox, 'div', 'img_nav_button next'),
            navTxt = max.addKid(navBox, 'div', 'img_nav_text'),
            thumbBox = max.addKid(navBox, 'ul', 'thumbnails'),
            currentSpan = max.addKid(navTxt, 'span', false, '0'),
            totalSpan = max.addKid(navTxt, 'span', false, totalTxt),
            captionBox = max.addKid(navTxt, 'div', 'caption');
        // add elements to project object
        projects[pNum].currentNumDisplay = currentSpan;
        projects[pNum].captionDisplay = captionBox;
        // create image thumbnails
        pImages.forEach(function (imgObj, imgNum) {
            var thumbImg = createThumbImg(imgObj, imgNum, pNum);

            thumbBox.appendChild(thumbImg);
        });
        // add navigation events
        max.addEvent(prevBtn, 'click', function () {
            changeImg(pNum, 'prev');
        });
        max.addEvent(nextBtn, 'click', function () {
            changeImg(pNum, 'next');
        });
        return navBox;
    }

    function createImg(imgObj, imgNum, pNum) {
        var pImg = max.addKid(false, 'img', {
            src: imgObj.link,
            alt: imgObj.caption
        });
        // fit image box for first image and wait to load
        if (imgNum === 0) {
            setImgBoxSize(pNum, imgObj.width, imgObj.height);
            max.addEvent(pImg, 'load', function () {
                // remove placeholder and show first image
                max.subClass(projects[pNum].boxImages, 'img_place');
                changeImg(pNum, 0);
            });
        }
        // add image to project object
        projects[pNum].images.push({
            img: pImg,
            width: imgObj.width,
            height: imgObj.height
        });
        return pImg;
    }

    function createFrame(imgObj, imgNum, pNum) {
        var pImg = max.addKid(false, 'iframe', {
            className: 'preview',
            src: imgObj.link,
            scrolling: 'no'
        });
//        // fit image box for first image and wait to load
//        if (imgNum === 0) {
//            setImgBoxSize(pNum, imgObj.width, imgObj.height);
//            max.addEvent(pImg, 'load', function () {
//                // remove placeholder and show first image
//                max.subClass(projects[pNum].boxImages, 'img_place');
//                changeImg(pNum, 0);
//            });
//        }
//        // add image to project object
//        projects[pNum].images.push({
//            img: pImg,
//            width: imgObj.width,
//            height: imgObj.height
//        });
        return pImg;
    }

    function createProject(pObj) {
        var pNum = projects.length,
            pBox = max.addKid(gallery.list, 'li', 'project'),
            pInfoBox = max.addKid(pBox, 'div', 'info_box'),
            pImgBox = max.addKid(pBox, 'div', 'image_box'),
            pInfo = max.addKid(pInfoBox, 'div', 'info'),
            pDescrip = max.addKid(pInfo, 'div', 'description'),
            pTitle = max.addKid(pDescrip, 'h3', false, pObj.name),
            pBody = max.addKid(pDescrip, 'p', false, pObj.description),
            pImgView = max.addKid(pImgBox, 'div', 'image_view'),
            pImages = max.addKid(pImgView, 'div', 'images img_place'),
            navBox;
        // add project object to array
        projects.push({
            box: pBox,
            boxInfo: pInfo,
            boxImg: pImgBox,
            boxImgView: pImgView,
            boxImages: pImages,
            images: [],
            thumbs: [],
            imgFocus: null
        });
        // create project images
        pObj.images.forEach(function (imgObj, imgNum) {
            var pImg;
            if (imgObj.type === 'PHOTO') {
                pImg = createImg(imgObj, imgNum, pNum);
            } else if (imgObj.type === 'URL') {
                pImg = createFrame(imgObj, imgNum, pNum);
            }
            pImages.appendChild(pImg);
        });
        // create image navigation
        /*if (pObj.images.length > 1) {
            navBox = createImgNav(pObj.images, pNum);
            pInfo.appendChild(navBox);
            max.addClass(pImages, 'clickable');
            // add navigation events
            max.addEvent(pImages, 'click', function () {
                changeImg(pNum, 'next');
            });
        }*/
    }

    function getProjects(pNum, pTag) {
        var paramObj = {};
        // check request variables
        if (projects.length > 0) {
            paramObj.offset = projects.length;
        }
        if (pNum) {
            paramObj.project = pNum;
        }
        if (pTag) {
            paramObj.tag = pTag;
        }
        max.request('GET', 'handle-projects.php', paramObj, function (result) {
            var projectObject = JSON.parse(result.responseText);
            projectObject.projects.forEach(createProject);
            // check for end of project feed
            if (projectObject.more) {
                loadReady = true;
            } else {
                max.addClass(gallery.list, 'done');
            }
        });
    }

    function checkScrollFocus(scrollUp) {
        var nextPNum = (
                scrollUp
                ? focusPNum - 1
                : focusPNum + 1
            ),
            pBoxPos;
        if (projects[nextPNum]) {
            pBoxPos = projects[nextPNum].box.getBoundingClientRect();
            // check next project position based on scroll direction
            if ((scrollUp && pBoxPos.top + pBoxPos.height >= 0)
                    || (!scrollUp && pBoxPos.top < 100)) {
                // save new number
                focusPNum = nextPNum;
            }
        }
    }

    function fixPosInfoBox(scrollUp) {
        var projObj = projects[focusPNum],
            pBox = projObj.box,
            pInfo = projObj.boxInfo,
            pInfoH = pInfo.offsetHeight,
            pBoxPos = pBox.getBoundingClientRect();
        // incase fast scroll skips check
        if (focusInfoBox.boxNum !== focusPNum && focusInfoBox.boxInfo) {
            max.subClass(focusInfoBox.boxInfo, 'fixed');
        }
        if (scrollUp) {
            if (pBoxPos.top >= 0) {
                // return info to original position
                max.subClass(pInfo, 'fixed');
            } else if (pBoxPos.height * -1 <= pBoxPos.top - pInfoH) {
                // info to upward position
                max.subClass(pInfo, 'bottom');
                max.addClass(pInfo, 'fixed');
            }
        } else if (pBoxPos.top <= 0) {
            if (pBoxPos.height * -1 >= pBoxPos.top - pInfo.offsetHeight) {
                // info to bottom position
                max.subClass(pInfo, 'fixed');
                max.addClass(pInfo, 'bottom');
            } else {
                // info to downward position
                max.addClass(pInfo, 'fixed');
            }
        }
        // save for next check
        focusInfoBox.boxNum = focusPNum;
        focusInfoBox.boxInfo = pInfo;
    }

    function scrollCheck() {
        var docHeight = document.body.scrollHeight,
            scrollBottom = docHeight - window.innerHeight - window.scrollY,
            scrollUp = oldScroll.y > window.scrollY;
        // check scroll direction
        oldScroll.y = window.scrollY;
        // check project in view
        checkScrollFocus(scrollUp);
        // adjust text position
        fixPosInfoBox(scrollUp);
        // load more projects on scroll
        if (loadReady && scrollBottom < 250) {
            loadReady = false;
            //getProjects();
        }
    }
    // check to uses arrow keys for image nav
    function keyCheck() {
        var keyCode = event.keyCode || event.which,
            isTyping = document.activeElement.type;
        if (projects.length && projects[focusPNum].images.length > 1 && !isTyping) {
            if (keyCode === 39) {
                changeImg(focusPNum, 'next');
            } else if (keyCode === 37) {
                changeImg(focusPNum, 'prev');
            }
        }
    }
    // check message status
    function checkMessage(result) {
        var returnObj = JSON.parse(result.responseText);
        msgForm.send.disabled = false;
        msgStatus.innerHTML = returnObj.status;
        if (returnObj.sent) {
            msgForm.reset();
        }
        setTimeout(function () {
            msgStatus.innerHTML = '';
        }, 5000);
    }
    // ajax form submit
    function sendMessage() {
        var email = msgForm.elements.email.value,
            message = msgForm.elements.message.value,
            paramObj = {
                from: email,
                question: message
            };
        event.preventDefault();
        msgForm.send.disabled = true;
        max.request('POST', 'send-message.php', paramObj, checkMessage);
        return false;
    }
    // create nav menu and project categories
    function addNavMenu (showCatItems) {
        var menuOpen = false,
            subMenuOpen = false,
            subMenuWasOpen = false,
            menuBoxes = {
                title: document.querySelector('#menu_title'),
                list:document.querySelector('#menu_list'),
                subTitle: document.querySelector('#sub_title'),
                subList:document.querySelector('#sub_menu_list'),
                btn: document.querySelector('#menu_btn')
            },
            infoBoxes = {
                about: document.querySelector('#about'),
                contact: document.querySelector('#contact')
            },
            selectInfo = null,
            selectItem = null,
            selectTag = null;
        // display nav selection
        function selectNavItem(itemName) {
            if (selectItem) {
                max.subClass(selectItem, 'selected');
            }
            if (itemName) {
                selectItem = event.target;
                max.addClass(selectItem, 'selected');
            } else {
                selectItem = false;
            }
        }
        // display info box selection
        function showInfo(itemName) {
            if (selectInfo) {
                max.subClass(infoBoxes[selectInfo], 'show');
            }
            if (itemName) {
                max.addClass(infoBoxes[itemName], 'show');
                selectInfo = itemName;
            } else {
                selectInfo = false;
            }
        }
        // set small screen nav menu open or closed
        function openMenu(isOpen) {
            if (isOpen === true) {
                menuOpen = true;
                max.addClass(menuBoxes.list, 'open');
                max.addClass(menuBoxes.btn, 'selected');
            } else {
                menuOpen = false;
                max.subClass(menuBoxes.list, 'open');
                max.subClass(menuBoxes.btn, 'selected');
            }
        }
        // toggle small screen nav menu
        function toggleMenu(isClosed) {
            if (menuOpen || isClosed === true) {
                openMenu(false);
                if (subMenuOpen) {
                    toggleSubMenu(true);
                    subMenuWasOpen = true;
                } else {
                    subMenuWasOpen = false;
                }
            } else {
                openMenu(true);
                if (subMenuWasOpen) {
                    toggleSubMenu(false);
                }
            }
        }
        // toggle tags sub menu
        function toggleSubMenu(isClosed) {
            if (subMenuOpen || isClosed === true) {
                subMenuOpen = false;
                max.subClass(menuBoxes.subList, 'open');
                max.subClass(menuBoxes.subTitle, 'selected');
            } else {
                subMenuOpen = true;
                max.addClass(menuBoxes.subList, 'open');
                max.addClass(menuBoxes.subTitle, 'selected');
                if (!menuOpen) {
                    openMenu(true);
                }
            }
        }
        // select item, display info selection
        function clickNavItem(itemName) {
            if (selectItem !== event.target) {
                selectNavItem(itemName);
                showInfo(itemName);
            } else {
                selectNavItem();
                showInfo();
            }
        }
        // append new item to nav list
        function addNavItem(itemName) {
            var item = max.addKid(menuBoxes.list, 'li'),
                itemBox = max.addKid(item, 'div', 'heading', itemName);
            max.addEvent(itemBox, 'click', function () {
                clickNavItem(itemName);
                toggleMenu(true);
            });
        }
        // clear nav selection and gallery
        function clearGallery() {
            gallery.title.innerHTML = '';
            gallery.list.innerHTML = '';
            max.subClass(gallery.list, 'categories');
            selectNavItem();
            showInfo();
        }
        // select sub menu item
        function selectSubItem(selected, tagObj) {
            var tagItem = event.target,
                tagList = null,
                t = 0;
            if (selectTag) {
                max.subClass(selectTag, 'selected');
            }
            if (selected) {
                if (tagItem.tagName !== 'LI') {
                    tagList = document.querySelector('#sub_menu_list').children;
                    for (t = 0; t < tagList.length; t += 1) {
                        if (tagList[t].innerHTML === tagObj.short) {
                            tagItem = tagList[t];
                        }
                    }
                }
                max.addClass(tagItem, 'selected');
                selectTag = tagItem;
            } else {
                selectTag = false;
            }
        }
        // select tag, clear gallery, get new projects, close menu
        function clickTagItem(tagObj) {
            selectSubItem(true, tagObj);
            clearGallery();
            gallery.title.innerHTML = tagObj.name;
            max.addClass(gallery.title, 'show');
            getProjects(0, tagObj.tag);
            toggleMenu(true);
        }
        // append new item to sub menu
        function addTagItem(tagObj) {
            var item = max.addKid(menuBoxes.subList, 'li', false, tagObj.short);
            max.addEvent(item, 'click', function () {
                clickTagItem(tagObj);
            });
        }
        // append new item to category display
        function addCatItem(catObj) {
            var item = max.addKid(gallery.list, 'li'),
                itemBox = max.addKid(item, 'div');
            max.addKid(itemBox, 'div', 'text', [
                [
                    'div', 'pad', [
                        [
                            'div', 'above', [
                                ['h3', 'heading', catObj.name],
                                ['span', false, catObj.summary]
                            ]
                        ],
                        ['div', 'filter']
                    ]
                ]
            ]);
            max.addEvent(itemBox, 'click', function () {
                clickTagItem(catObj);
            });
            catObj.images.forEach(function (imgObj) {
                max.addKid(itemBox, 'div', {
                    className: 'img',
                    style: {
                        backgroundImage: 'url(' + imgObj.link + ')'
                    }
                });
            });
        }
        // fill category list
        function fillCatList(items) {
            max.addClass(gallery.list, 'categories');
            items.categories.forEach(addCatItem);
        }
        // reset nav menu and gallery list
        function resetPage() {
            selectSubItem();
            clearGallery();
            getInfo(fillCatList);
            toggleMenu(true);
        }
        // get portfolio info object
        function getInfo(passFn) {
            max.request('GET', 'handle-nav-items.php', false, function (result) {
                var items = JSON.parse(result.responseText);
                if (passFn) {
                    passFn(items);
                }
            });
        }
        // create nav items, add events, show items
        function initMenu(result) {
            var items = JSON.parse(result.responseText);
            items.nav.forEach(addNavItem);
            items.categories.forEach(addTagItem);
            max.addEvent(menuBoxes.title, 'click', resetPage);
            max.addEvent(menuBoxes.subTitle, 'click', toggleSubMenu);
            max.addEvent(menuBoxes.btn, 'click', toggleMenu);
            max.addClass(menuBoxes.btn, 'show');
            if (showCatItems) {
                max.addClass(gallery.list, 'categories');
                items.categories.forEach(addCatItem);
            }
        }
        // get menu json data
        max.request('GET', 'handle-nav-items.php', false, initMenu);
    }
    // check url parameters, get elements, add events, add content
    function initDoc() {
        var paramObj = max.parseQueryStr();
        msgForm = document.forms.ask;
        msgStatus = document.querySelector('#msg_status');
        gallery.title = document.querySelector('#gallery_title');
        gallery.list = document.querySelector('#gallery_list');
        //max.addEvent(window, 'scroll', scrollCheck);
        //max.addEvent(window, 'keydown', keyCheck);
        max.addEvent(msgForm, 'submit', sendMessage);
        msgForm.send.disabled = false;
        if (paramObj) {
            addNavMenu();
            getProjects(paramObj.p, paramObj.tag);
        } else {
            addNavMenu(true);
        }
    }
    // initialize page on window load
    max.addEvent(window, 'load', initDoc);
}(window, document, max));