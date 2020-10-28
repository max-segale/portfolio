// Portfolio JS components
(function (window, document, max) {
  let project = {};
  let heroImg1 = null;
  let heroImg2 = null;
  let gallery = null;
  let msgForm = null;
  let msgStatus = null;
  let backdrop = null;

  // Select project view image, select thumb, show caption
  function selectViewImg(imgNum) {
    const imgObj = project.images[imgNum];
    const thumbObj = project.thumbs[imgNum];
    const theClass = 'selected';
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

  // Select next image in project
  function nextImg() {
    const nextNum = project.selectNum + 1;
    if (nextNum < project.images.length) {
      selectViewImg(nextNum);
    } else {
      selectViewImg(0);
    }
  }

  // Select previous image in project
  function prevImg() {
    const nextNum = project.selectNum - 1;
    const lastNum = project.images.length - 1;
    if (nextNum >= 0) {
      selectViewImg(nextNum);
    } else {
      selectViewImg(lastNum);
    }
  }

  // Navigate project images with keyboard
  function keyCheck() {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 39) {
      // Right arrow
      nextImg();
    } else if (keyCode === 37) {
      // Left arrow
      prevImg();
    }
  }

  // Remove project view
  function closeView() {
    const theClass = 'see-thru';
    // Fade to 0 opacity
    project.box.classList.add(theClass);
    project.closeBtn.classList.add(theClass);
    backdrop.classList.add(theClass);
    // Remove after transition is complete
    backdrop.addEventListener('transitionend', () => {
      if (event.propertyName === 'opacity') {
        // Remove project pop-up from DOM
        document.body.removeChild(project.box);
        document.body.removeChild(project.closeBtn);
        // Clear project object
        project = {};
        // Remove keyboard navigation
        window.removeEventListener('keydown', keyCheck);
        // Remove backdrop
        document.body.removeChild(backdrop);
        backdrop = false;
        // Enable scrolling
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Common child image div
  function newImg(imgParent, imgObj) {
    return max.newKid(imgParent, 'img', {
      src: imgObj.link,
      alt: imgObj.caption
    });
  }

  // Add project view image
  function viewImg(imgObj, imgNum, imgMulti) {
    const imgBox = max.newKid(project.imgsBox, 'div', 'img');
    const img = newImg(imgBox, imgObj);
    if (imgMulti) {
      img.addEventListener('click', nextImg);
    }
    project.images[imgNum].box = imgBox;
  }

  // Add project view thumbnail
  function viewThumb(imgObj, imgNum) {
    const thumbBox = max.newKid(project.thumbsBox, 'div', 'thumb');
    const thumb = newImg(thumbBox, imgObj);
    thumbBox.title = imgObj.caption;
    thumbBox.addEventListener('click', () => {
      selectViewImg(imgNum);
    });
    project.thumbs.push(thumbBox);
  }

  // Add project view
  function viewProject(pObj, imgObj, imgNum) {
    let multiImg = true;
    if (pObj.images.length === 1) {
      multiImg = false;
    }
    // Add X close button
    project.closeBtn = max.newKid(document.body, 'div', 'modal-close');
    project.closeBtn.addEventListener('click', closeView);
    // Add project pop-up
    project.box = max.newKid(document.body, 'div', 'modal-project', [
      ['div', 'name', pObj.name]
    ]);
    project.box.addEventListener('click', () => {
      if (event.target === project.box || event.target.classList[0] === 'img') {
        closeView();
      }
    });
    // Add image view
    project.imgsBox = max.newKid(project.box, 'div', 'imgs_box');
    project.images = pObj.images;
    pObj.images.forEach((obj, num) => {
      viewImg(obj, num, multiImg)
    });
    // Add navigation controls
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
    // Add thumbnails
    project.thumbs = [];
    if (multiImg) {
      project.thumbsBox = max.newKid(project.box, 'div', 'thumbs_box');
      pObj.images.forEach(viewThumb);
    }
    // Select first image
    selectViewImg(imgNum);
    // Add keyboard navigation
    if (multiImg) {
      window.addEventListener('keydown', keyCheck);
    }
    // Add backdrop
    backdrop = max.newKid(document.body, 'div', 'modal-backdrop');
    // Disable scroll
    document.body.classList.add('no-scroll');
    project.box.addEventListener('touchmove', () => {
      event.preventDefault();
    }, {passive: true});
  }

  // Create gallery project
  function addProject(pObj) {
    const pBox = max.newKid(gallery, 'div', 'project');
    const infoBox = max.newKid(pBox, 'div', 'info', [
      ['h4', 'heading-3 name', pObj.name],
      ['p', false, pObj.summary]
    ]);
    const pImages = max.newKid(pBox, 'div', 'images');
    if (pObj.link) {
      max.newKid(infoBox, 'p', 'link-out', [
        ['a', {href: pObj.link, target: '_blank', rel: 'noopener'}, [
          ['span', false, 'Visit Website']
        ]]
      ]);
    }
    pObj.images.forEach((imgObj, imgNum) => {
      const img = max.newKid(pImages, 'div', 'image-box', [
        ['img', {
          src: imgObj.link,
          alt: imgObj.caption
        }]
      ]);
      const imgRatio = imgObj.width / imgObj.height;
      if (imgRatio < 0.75) {
        img.classList.add('tall');
      } else if (imgRatio > 1.5) {
        img.classList.add('wide');
      }
      img.addEventListener('click', () => {
        viewProject(pObj, imgObj, imgNum);
      });
    });
  }

  // Check parameters, get projects object, create list
  function getProjects(paramObj) {
    const pObj = {};
    if (paramObj && paramObj.p) {
      pObj.project = paramObj.p;
    }
    if (paramObj && paramObj.tag) {
      pObj.tag = paramObj.tag;
    }
    max.request('GET', 'handle-projects.php', pObj, (XHR) => {
      const projObj = JSON.parse(XHR.responseText);
      gallery.innerHTML = '';
      projObj.projects.forEach(addProject);
    });
  }

  // Check message status
  function checkMessage(XHR) {
    const returnObj = JSON.parse(XHR.responseText);
    msgForm.send.disabled = false;
    msgStatus.innerHTML = returnObj.status;
    if (returnObj.sent) {
      msgForm.reset();
    }
    setTimeout(() => {
      msgStatus.innerHTML = '';
    }, 5000);
  }

  // Form submit AJAX
  function sendMessage() {
    const email = msgForm.elements.email.value;
    const question = msgForm.elements.question.value;
    const paramObj = {
      from: email,
      message: question
    };
    event.preventDefault();
    msgForm.send.disabled = true;
    max.request('POST', 'send-message.php', paramObj, checkMessage);
    return false;
  }

  function checkHeroImg(row, xOffset, direction) {
    //if (xOffset * -1 <= row.offsetWidth - window.innerWidth) {
      row.style.[direction] = xOffset + 'px';
    //}
  }

  // Handle scroll position
  function checkScroll(e) {
    const xPos = window.scrollY * -2;
    checkHeroImg(heroImg1, xPos, 'left');
    checkHeroImg(heroImg2, xPos, 'right');
  }

  // Initialize page
  function initDoc() {
    // Parse URL parameters
    const paramObj = max.parseQueryStr();
    // Get DOM elements
    heroImg1 = document.querySelector('#hero-images-1');
    heroImg2 = document.querySelector('#hero-images-2');
    gallery = document.querySelector('#gallery');
    msgStatus = document.querySelector('#msg-status');
    msgForm = document.forms.ask;
    // Add event listeners
    window.addEventListener('scroll', checkScroll, {passive: true});
    msgForm.addEventListener('submit', sendMessage);
    // Get project data
    getProjects(paramObj);
  }

  // Window loaded
  window.addEventListener('load', initDoc);

}(window, document, max));
