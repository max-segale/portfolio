/*
  Max Segale
  Portfolio JS components
*/
(function (window, document, max) {
  'use strict';
  var gallery = {},
    project = {},
    touchVals = {},
    msgForm = null,
    msgStatus = null,
    backdrop = null,
    clickBlock = null;
  // Toggle backdrop
  function toggleBackdrop() {
    if (!backdrop) {
      backdrop = max.newKid(document.body, 'div', 'backdrop');
      backdrop.addEventListener('click', closeView);
      document.body.classList.add('no_scroll');
      project.box.addEventListener('touchmove', function () {
        event.preventDefault();
      });
    } else {
      document.body.removeChild(backdrop);
      document.body.classList.remove('no_scroll');
      backdrop = false;
    }
  }
  // Select project view image, select thumb, show caption
  function selectViewImg(imgNum) {
    var imgObj = project.images[imgNum],
      thumbObj = project.thumbs[imgNum],
      theClass = 'selected',
      maxWidth = imgObj.box.parentNode.offsetWidth;
    project.selectNum = imgNum;
    if (project.selectImg) {
      project.selectImg.classList.remove(theClass);
      project.selectImg.style.paddingTop = '';
    }
    imgObj.box.classList.add(theClass);
    project.selectImg = imgObj.box;
    if (project.selectThumb) {
      project.selectThumb.classList.remove(theClass);
    }
    if (thumbObj) {
      thumbObj.classList.add(theClass);
      project.selectThumb = thumbObj;
    }
    project.caption.innerHTML = project.images[imgNum].caption;
  }
  // Common child image div
  function newImg(imgParent, imgObj) {
    var img = max.newKid(imgParent, 'div', {
        style: {backgroundImage: 'url(' + imgObj.link + ')'}
      });
    return img;
  }
  // Add project view image
  function viewImg(imgObj, imgNum) {
    var img = newImg(project.imgBox, imgObj);
    project.images[imgNum].box = img;
  }
  // Add project view thumbnail
  function viewThumb(imgObj, imgNum) {
    var thumb = newImg(project.thumbBox, imgObj);
    thumb.title = imgObj.caption;
    thumb.addEventListener('click', function () {
      selectViewImg(imgNum);
    });
    project.thumbs.push(thumb);
  }
  // Select next image in project
  function nextImg() {
    var nextNum = project.selectNum + 1;
    if (nextNum < project.images.length) {
      selectViewImg(nextNum);
    } else {
      selectViewImg(0);
    }
  }
  // Select previous image in project
  function prevImg() {
    var nextNum = project.selectNum - 1,
      lastNum = project.images.length - 1;
    if (nextNum >= 0) {
      selectViewImg(nextNum);
    } else {
      selectViewImg(lastNum);
    }
  }
  // Nav project view with keyboard
  function keyCheck() {
    var keyCode = event.keyCode || event.which;
    if (keyCode === 39) {
      nextImg();
    } else if (keyCode === 37) {
      prevImg();
    }
  }
  // Remove project view
  function closeView() {
    var theClass = 'see_thru';
    project.box.classList.add(theClass);
    project.closeBtn.classList.add(theClass);
    backdrop.classList.add(theClass);
    // Remove after transition is complete
    backdrop.addEventListener('transitionend', function () {
      if (event.propertyName === 'opacity') {
        document.body.removeChild(project.box);
        document.body.removeChild(project.closeBtn);
        project = {};
        window.removeEventListener('keydown', keyCheck);
        toggleBackdrop();
      }
    });
  }
  // Add project view
  function viewProject(pObj, imgObj, imgNum) {
    var multiImg = true;
    if (pObj.images.length === 1) {
      multiImg = false;
    }
    project.closeBtn = max.newKid(document.body, 'div', 'project_close');
    project.closeBtn.addEventListener('click', closeView);
    project.box = max.newKid(document.body, 'div', 'project', [
      ['div', 'name', pObj.name]
    ]);
    project.navBox = max.newKid(project.box, 'div', 'ctl_box');
    if (multiImg) {
      project.prevBtn = max.newKid(project.navBox, 'div', 'prev');
      project.prevBtn.addEventListener('click', prevImg);
    }
    project.caption = max.newKid(project.navBox, 'div', 'caption', imgObj.caption);
    if (multiImg) {
      project.nextBtn = max.newKid(project.navBox, 'div', 'next');
      project.nextBtn.addEventListener('click', nextImg);
    }
    project.imgBox = max.newKid(project.box, 'div', 'img_box');
    if (multiImg) {
      project.imgBox.addEventListener('click', nextImg);
      project.thumbBox = max.newKid(project.box, 'div', 'thumb_box');
    }
    project.images = pObj.images;
    project.thumbs = [];
    pObj.images.forEach(viewImg);
    if (multiImg) {
      pObj.images.forEach(viewThumb);
    }
    selectViewImg(imgNum);
    if (multiImg) {
      window.addEventListener('keydown', keyCheck);
    }
    toggleBackdrop();
  }
  // Create project list item
  function addProject(pObj) {
    var pItem = max.newKid(gallery.list, 'li', pObj.tags[0], [
        ['div', 'info', [
          ['span', {
            className: 'name',
            onclick: function () {
              viewProject(pObj, pObj.images[0], 0);
            }
          }, pObj.name],
          ['br'],
          ['span', false, pObj.summary]
        ]]
      ]),
      pImages = max.newKid(pItem, 'div', 'images');
    pObj.images.forEach(function (imgObj, imgNum) {
      var img = max.newKid(pImages, 'div', 'image', [
        ['img', {
          src: imgObj.link,
          alt: imgObj.caption
        }]
      ]);
      img.addEventListener('click', function () {
        viewProject(pObj, imgObj, imgNum);
      });
    });
  }
  // Check parameters, get projects object, create list
  function getProjects(pNum, pTag, pTagName) {
    var paramObj = {};
    if (pNum) {
      paramObj.project = pNum;
    }
    if (pTag) {
      paramObj.tag = pTag;
    }
    max.request('GET', 'handle-projects.php', paramObj, function (XHR) {
      var projObj = JSON.parse(XHR.responseText);
      gallery.list.innerHTML = '';
      gallery.list.classList.add('projects');
      gallery.title.innerHTML = projObj.category;
      gallery.title.classList.add('show');
      projObj.projects.forEach(addProject);
    });
  }
  // Check message status
  function checkMessage(XHR) {
    var returnObj = JSON.parse(XHR.responseText);
    msgForm.send.disabled = false;
    msgStatus.innerHTML = returnObj.status;
    if (returnObj.sent) {
      msgForm.reset();
    }
    setTimeout(function () {
      msgStatus.innerHTML = '';
    }, 5000);
  }
  // Form submit AJAX
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
  // Create nav menu and project categories display
  function addNavMenu (showCatItems, catTag) {
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
        holder: document.querySelector('#nav_boxes'),
        about: document.querySelector('#about'),
        contact: document.querySelector('#contact')
      },
      navItems = {},
      selectInfo = null,
      selectItem = null,
      selectTag = null;
    // Check nav box transition
    infoBoxes['holder'].addEventListener('transitionend', function () {
      if (event.propertyName === 'height') {
        if (infoBoxes['holder'].style.height !== '0px') {
          infoBoxes['holder'].style.height = 'initial';
        }
      }
    });
    // Display nav selection
    function selectNavItem(itemName) {
      var theClass = 'selected';
      if (selectItem) {
        selectItem.classList.remove(theClass);
      }
      if (itemName) {
        selectItem = event.target;
        selectItem.classList.add(theClass);
      } else {
        selectItem = false;
      }
    }
    // Close info boxes
    function noInfo() {
      infoBoxes['holder'].style.height = 0;
    }
    // Display info box selection
    function showInfo(itemName) {
      var infoHeight = null;
      if (selectInfo) {
        // Set height before close for transition
        infoHeight = infoBoxes[selectInfo].offsetHeight;
        infoBoxes['holder'].style.height = infoHeight + 'px';
        infoBoxes[selectInfo].classList.remove('show');
      }
      if (itemName) {
        // Go to top of page
        window.scrollTo(0, window.scrollX);
        infoBoxes[itemName].classList.add('show');
        // Set height for transition, remove after for resize
        infoHeight = infoBoxes[itemName].offsetHeight;
        infoBoxes['holder'].style.height = infoHeight + 'px';
        selectInfo = itemName;
      } else {
        selectInfo = false;
        // Allow height to set before close
        setTimeout(noInfo, 100);
      }
    }
    // Set small screen nav menu open or closed
    function openMenu(isOpen) {
      if (isOpen === true) {
        menuOpen = true;
        menuBoxes.list.classList.add('open');
        menuBoxes.btn.classList.add('selected');
        clickBlock = max.newKid(document.body, 'div', 'click_block');
        clickBlock.addEventListener('click', toggleMenu);
      } else {
        menuOpen = false;
        menuBoxes.list.classList.remove('open');
        menuBoxes.btn.classList.remove('selected');
        if (clickBlock) {
          document.body.removeChild(clickBlock);
          clickBlock = null;
        }
      }
    }
    // Toggle small screen nav menu
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
    // Toggle tags sub menu
    function toggleSubMenu(isClosed) {
      if (subMenuOpen || isClosed === true) {
        subMenuOpen = false;
        menuBoxes.subList.classList.remove('open');
        menuBoxes.subTitle.classList.remove('selected');
      } else {
        subMenuOpen = true;
        menuBoxes.subList.classList.add('open');
        menuBoxes.subTitle.classList.add('selected');
        if (!menuOpen) {
          openMenu(true);
        }
      }
    }
    // Select item, display info selection
    function clickNavItem(itemName) {
      if (selectItem !== event.target) {
        selectNavItem(itemName);
        showInfo(itemName);
      } else {
        selectNavItem();
        showInfo();
      }
    }
    // Append new item to nav list
    function addNavItem(itemName) {
      var item = max.newKid(menuBoxes.list, 'li'),
        itemBox = max.newKid(item, 'div', 'heading', itemName);
      itemBox.addEventListener('click', function () {
        clickNavItem(itemName);
        toggleMenu(true);
      });
    }
    // Clear nav selection and gallery
    function clearGallery() {
      gallery.title.innerHTML = '';
      gallery.title.classList.remove('show');
      gallery.list.innerHTML = '<li class="loading"></li>';
      gallery.list.classList.remove('categories');
      gallery.list.classList.remove('projects');
      selectNavItem();
      showInfo();
    }
    // Select sub menu item
    function selectSubItem(theTag) {
      var tagItem = navItems[theTag];
      if (selectTag) {
        selectTag.classList.remove('selected');
      }
      if (theTag) {
        tagItem.classList.add('selected');
        selectTag = tagItem;
      } else {
        selectTag = false;
      }
    }
    // Select tag, clear gallery, get new projects, close menu
    function clickTagItem(tagObj) {
      selectSubItem(tagObj.tag);
      clearGallery();
      getProjects(0, tagObj.tag);
      toggleMenu(true);
    }
    // Append new item to sub menu
    function addTagItem(tagObj) {
      var attrObj = {title: tagObj.name},
        item = max.newKid(menuBoxes.subList, 'li', attrObj, tagObj.short);
      navItems[tagObj.tag] = item;
      item.addEventListener('click', function () {
        clickTagItem(tagObj);
      });
    }
    // Show category image after it loads
    function showImg() {
      var img = event.target;
      img.classList.add('show');
    }
    // Append new item to category display
    function addCatItem(catObj) {
      var item = max.newKid(gallery.list, 'li', false, [
          ['div', 'type', [
            ['div', 'text', [
              ['h3', 'cat_name', catObj.name],
              ['br'],
              ['h4', 'cat_summ', catObj.summary]
            ]]
          ]]
        ]),
        rowWrap = max.newKid(item, 'div', 'row_wrap'),
        imgRow = max.newKid(rowWrap, 'div', 'row');
      item.addEventListener('click', function () {
        clickTagItem(catObj);
      });
      catObj.images.forEach(function (imgObj) {
        var catImg = max.newKid(imgRow, 'img', {
            className: 'cat_list_img',
            src: imgObj.link,
            alt: imgObj.caption
          });
        catImg.addEventListener('load', showImg);
      });
      setTimeout(function () {
        rowWrap.classList.add('sliding');
      }, 1000);
    }
    // Fill category list
    function fillCatList(items) {
      gallery.list.classList.add('categories');
      items.categories.forEach(addCatItem);
    }
    // Reset nav menu and gallery list
    function resetPage() {
      selectSubItem();
      clearGallery();
      toggleMenu(true);
      getInfo(fillCatList);
    }
    // Get portfolio info object
    function getInfo(passFn) {
      max.request('GET', 'handle-nav-items.php', false, function (XHR) {
        var items = JSON.parse(XHR.responseText);
        gallery.list.innerHTML = '';
        if (passFn) {
          passFn(items);
        }
      });
    }
    // Create nav items, add events, show items
    function initMenu(items) {
      items.nav.forEach(addNavItem);
      items.categories.forEach(addTagItem);
      menuBoxes.title.addEventListener('click', resetPage);
      menuBoxes.subTitle.addEventListener('click', toggleSubMenu);
      menuBoxes.btn.addEventListener('click', toggleMenu);
      menuBoxes.btn.classList.add('show');
      if (showCatItems) {
        fillCatList(items);
      }
      if (catTag) {
        selectSubItem(catTag);
      }
    }
    // Get menu json data and initialize
    getInfo(initMenu);
  }
  // Check url parameters, get elements, add events, add content
  function initDoc() {
    var paramObj = max.parseQueryStr();
    msgForm = document.forms.ask;
    msgStatus = document.querySelector('#msg_status');
    gallery.title = document.querySelector('#gallery_title');
    gallery.list = document.querySelector('#gallery_list');
    msgForm.addEventListener('submit', sendMessage);
    if (paramObj) {
      addNavMenu(false, paramObj.tag);
      getProjects(paramObj.p, paramObj.tag);
    } else {
      addNavMenu(true);
    }
  }
  // Initialize page on window load
  window.addEventListener('load', initDoc);
}(window, document, max));
