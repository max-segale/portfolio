(function (window, document, max) {
    'use strict';
    var loadReady = false,
        focusPNum = 0,
        projects = [],
        focusInfoBox = {},
        oldScroll = {},
        nav = null,
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
        var thumbImg = max.newEl(false, 'li', {
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
            navBox = max.newEl(false, 'div', 'img_nav'),
            prevBtn = max.newEl(navBox, 'div', 'img_nav_button prev'),
            nextBtn = max.newEl(navBox, 'div', 'img_nav_button next'),
            navTxt = max.newEl(navBox, 'div', 'img_nav_text'),
            thumbBox = max.newEl(navBox, 'ul', 'thumbnails'),
            currentSpan = max.newEl(navTxt, 'span', false, '0'),
            totalSpan = max.newEl(navTxt, 'span', false, totalTxt),
            captionBox = max.newEl(navTxt, 'div', 'caption');
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
        var pImg = max.newEl(false, 'img', {
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
        var pImg = max.newEl(false, 'iframe', {
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
            pBox = max.newEl(gallery.list, 'li', 'project'),
            pInfoBox = max.newEl(pBox, 'div', 'info_box'),
            pImgBox = max.newEl(pBox, 'div', 'image_box'),
            pInfo = max.newEl(pInfoBox, 'div', 'info'),
            pDescrip = max.newEl(pInfo, 'div', 'description'),
            pTitle = max.newEl(pDescrip, 'h3', false, pObj.name),
            pBody = max.newEl(pDescrip, 'p', false, pObj.description),
            pImgView = max.newEl(pImgBox, 'div', 'image_view'),
            pImages = max.newEl(pImgView, 'div', 'images img_place'),
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
    
    // clear content list
    function clearGallery() {
        gallery.list.innerHTML = '';
        max.subClass(gallery.list, 'categories');
        //openMenu(false);
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
            //menuBoxes.subTitle.innerHTML = catTag;
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

    function keyCheck() {
        var keyCode = event.keyCode || event.which,
            isTyping = document.activeElement.type;
        // check for multiple images and not typing
        if (projects.length && projects[focusPNum].images.length > 1 && !isTyping) {
            // use arrows for image navigation
            if (keyCode === 39) {
                changeImg(focusPNum, 'next');
            } else if (keyCode === 37) {
                changeImg(focusPNum, 'prev');
            }
        }
    }
    
    function addNavMenu (showCatItems) {
        // nav menu and project categories module
        var menuOpen = false,
            subMenuOpen = false,
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
            initTitle = menuBoxes.subTitle.innerHTML,
            selectInfo,
            selectItem;
        // display nav selection
        function selectNavItem(itemName) {
            //var titleText = itemName;
            if (selectItem) {
                max.subClass(selectItem, 'selected');
            }
            if (itemName) {
                selectItem = event.target;
                max.addClass(selectItem, 'selected');
            } else {
                selectItem = false;
                //titleText = initTitle;
            }
            //menuBoxes.subTitle.innerHTML = titleText;
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
        function openMenu(isOpen) {
            if (isOpen === true) {
                menuOpen = true;
                max.addClass(menuBoxes.list, 'open');
                max.addClass(menuBoxes.btn, 'selected');
            } else {
                menuOpen = false;
                max.subClass(menuBoxes.list, 'open');
                max.subClass(menuBoxes.btn, 'selected');
                toggleSubMenu(true);
            }
        }
        // toggle small screen nav menu
        function toggleMenu() {
            if (menuOpen) {
                openMenu(false);
            } else {
                openMenu(true);
            }
        }
        //
        function toggleSubMenu(isClosed) {
            if (subMenuOpen || isClosed === true) {
                subMenuOpen = false;
                max.subClass(menuBoxes.subList, 'open');
                max.subClass(menuBoxes.subTitle, 'selected');
            } else {
                subMenuOpen = true;
                max.addClass(menuBoxes.subList, 'open');
                max.addClass(menuBoxes.subTitle, 'selected');
                openMenu(true);
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
            openMenu(false);
        }
        // append new item to nav list
        function addNavItem(itemName) {
            var item = max.newEl(menuBoxes.list, 'li'),
                itemBox = max.newEl(item, 'div', false, itemName);
            max.addEvent(itemBox, 'click', function () {
                clickNavItem(itemName);
            });
        }
        // select tag, close menu, clear gallery, get new projects
        function clickTagItem(tag) {
            selectNavItem();
            showInfo();
            openMenu(false);
            clearGallery();
            getProjects(0, tag);
        }
        // append new item to sub menu
        function addTagItem(tagObj) {
            var item = max.newEl(menuBoxes.subList, 'li', false, tagObj.tag);
            max.addEvent(item, 'click', function () {
                clickTagItem(tagObj.tag);
            });
        }
        // append new item to category display
        function addCatItem(catObj) {
            var item = max.newEl(gallery.list, 'li'),
                itemBox = max.newEl(item, 'div'),
                textBox = max.newEl(itemBox, 'div', 'text'),
                heading = max.newEl(textBox, 'h3', 'heading', catObj.name),
                summary = max.newEl(textBox, 'span', false, catObj.summary);
            max.addEvent(itemBox, 'click', function () {
                clickTagItem(catObj.tag);
            });
            catObj.images.forEach(function (imgObj) {
                max.newEl(itemBox, 'div', {
                    className: 'img',
                    style: {
                        backgroundImage: 'url(' + imgObj.link + ')'
                    }
                });
            });
        }
        // reset nav menu and gallery list
        function resetPage() {
            console.log('RESET');
        }
        // use title as reset button
        max.addEvent(menuBoxes.title, 'click', resetPage);
        // get nav object
        max.request('GET', 'handle-nav-items.php', false, function (result) {
            var items = JSON.parse(result.responseText);
            // create nav list items
            items.nav.forEach(addNavItem);
            // create sub items
            items.categories.forEach(addTagItem);
            max.addEvent(menuBoxes.subTitle, 'click', toggleSubMenu);
            // show menu button
            max.addEvent(menuBoxes.btn, 'click', toggleMenu);
            max.addClass(menuBoxes.btn, 'show');
            if (showCatItems) {
                // show project categories
                max.addClass(gallery.list, 'categories');
                items.categories.forEach(addCatItem);
            }
        });
    }

    max.addEvent(window, 'load', function () {
        var paramObj = max.parseQueryStr();
        gallery.title = document.querySelector('#gallery_list');
        gallery.list = document.querySelector('#gallery_list');
        if (paramObj) {
            addNavMenu();
            getProjects(paramObj.p, paramObj.tag);
        } else {
            addNavMenu(true);
        }
        //max.addEvent(window, 'scroll', scrollCheck);
        //max.addEvent(window, 'keydown', keyCheck);
    });

}(window, document, max));