// Portfolio JS components
(function (window, document, max) {
  let project = {};
  let heroImg1 = null;
  let heroImg2 = null;
  let gallery = null;
  let msgForm = null;
  let msgStatus = null;

  // Show selected image in project modal
  function selectViewImg(imgNum) {
    const imgObj = project.images[imgNum];
    const thumbObj = project.thumbs[imgNum];
    const theClass = 'selected';
    project.selectNum = imgNum;
    // Check for previous image to deselect
    if (project.selectImg) {
      project.selectImg.classList.remove(theClass);
    }
    // Check for previous thumbanil to deselect
    if (project.selectThumb) {
      project.selectThumb.classList.remove(theClass);
    }
    // Select current image
    imgObj.box.classList.add(theClass);
    project.selectImg = imgObj.box;
    // Select current thumbnail, if available
    if (thumbObj) {
      thumbObj.classList.add(theClass);
      project.selectThumb = thumbObj;
    }
    // Show current image caption
    project.caption.innerHTML = project.images[imgNum].caption;
  }

  // Select next image in project
  function nextImg() {
    const nextNum = project.selectNum + 1;
    if (nextNum < project.images.length) {
      selectViewImg(nextNum);
    } else {
      // If at last image, go to first image
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
      // If at first image, go to last image
      selectViewImg(lastNum);
    }
  }

  // Navigate project images with keyboard
  function keyCheck(event) {
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
    project.backdrop.classList.add(theClass);
    // Remove after transition is complete
    project.backdrop.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'opacity') {
        // Remove project pop-up from DOM
        document.body.removeChild(project.box);
        document.body.removeChild(project.closeBtn);
        document.body.removeChild(project.backdrop);
        // Clear project object
        project = {};
        // Remove keyboard navigation
        window.removeEventListener('keydown', keyCheck);
        // Re-enable scrolling
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Add specific classes to images
  function addImgClasses(imgObj, img) {
    // Mimic iPhone screen corners
    if (imgObj.type === 'IPHONE') {
      if (imgObj.width > imgObj.height) {
        img.classList.add('iphone-corners-l');
      } else {
        img.classList.add('iphone-corners-p');
      }
    } else if (imgObj.type === 'MAC') {
      img.classList.add('mac-corners');
    }
  }

  // Create image
  function newImg(imgParent, imgObj) {
    return max.newKid(imgParent, 'img', {
      src: imgObj.file,
      alt: imgObj.caption
    });
  }

  // Add image to project modal
  function viewImg(imgObj, imgNum, imgMulti) {
    const imgBox = max.newKid(project.imgsBox, 'div', 'image');
    const img = newImg(imgBox, imgObj);
    addImgClasses(imgObj, img);
    if (imgMulti) {
      imgBox.addEventListener('click', nextImg);
    }
    project.images[imgNum].box = imgBox;
  }

  // Add thumbnail to project modal
  function viewThumb(imgObj, imgNum) {
    const thumbBox = max.newKid(project.thumbsBox, 'div', 'thumb');
    const thumb = newImg(thumbBox, imgObj);
    thumbBox.title = imgObj.caption;
    thumbBox.addEventListener('click', (event) => {
      selectViewImg(imgNum);
    });
    project.thumbs.push(thumbBox);
  }

  // Create project modal
  function viewProject(pObj, imgObj, imgNum) {
    let multiImg = true;
    if (pObj.images.length === 1) {
      multiImg = false;
    }
    // Add X close button
    project.closeBtn = max.newKid(document.body, 'div', 'modal-close');
    project.closeBtn.addEventListener('click', closeView);
    // Add project view
    project.box = max.newKid(document.body, 'div', 'modal-project', [
      ['h4', 'heading-3 name', pObj.title]
    ]);
    project.box.addEventListener('click', (event) => {
      if (event.target === project.box || event.target.classList[0] === 'img') {
        closeView();
      }
    });
    // Add images
    project.imgsBox = max.newKid(project.box, 'div', 'images-row');
    project.images = pObj.images;
    pObj.images.forEach((obj, num) => {
      viewImg(obj, num, multiImg);
    });
    if (multiImg) {
      project.imgsBox.classList.add('multi');
    }
    // Add navigation controls
    project.navBox = max.newKid(project.box, 'div', 'ctrl-row');
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
      project.thumbsBox = max.newKid(project.box, 'div', 'thumbs-row');
      pObj.images.forEach(viewThumb);
    }
    // Select first image
    selectViewImg(imgNum);
    // Add keyboard navigation
    if (multiImg) {
      window.addEventListener('keydown', keyCheck);
    }
    // Add backdrop
    project.backdrop = max.newKid(document.body, 'div', 'modal-backdrop');
    // Disable scroll
    document.body.classList.add('no-scroll');
    project.box.addEventListener('touchmove', (event) => {
      event.preventDefault();
    }, {passive: true});
  }

  // Create gallery project
  function addProject(pObj) {
    const pBox = max.newKid(gallery, 'div', 'project');
    const infoBox = max.newKid(pBox, 'div', 'info', [
      ['h4', 'heading-3 name', pObj.title],
      ['p', false, pObj.description]
    ]);
    const pImages = max.newKid(pBox, 'div', 'images');
    let linkText = 'Visit Website';
    if (pObj.cta) {
      linkText = pObj.cta;
    }
    // Add link to website, if available
    if (pObj.link) {
      max.newKid(infoBox, 'p', 'link-out', [
        ['a', {href: pObj.link, target: '_blank', rel: 'noopener'}, [
          ['span', false, linkText]
        ]]
      ]);
    }
    // Add project images
    pObj.images.forEach((imgObj, imgNum) => {
      const imgBox = max.newKid(pImages, 'div', 'image-box');
      const img = newImg(imgBox, imgObj);
      const imgRatio = imgObj.width / imgObj.height;
      // Check image aspect ratio
      if (imgRatio < 0.75) {
        imgBox.classList.add('tall');
      } else if (imgRatio > 1.5) {
        imgBox.classList.add('wide');
      }
      addImgClasses(imgObj, img);
      // Move to next image if clicked
      imgBox.addEventListener('click', (event) => {
        viewProject(pObj, imgObj, imgNum);
      });
    });
  }

  // Get data and create projects
  function getProjects(paramObj) {
    const pObj = {};
    // Check if URL parameters are being used
    if (paramObj && paramObj.p) {
      pObj.project = paramObj.p;
    }
    if (paramObj && paramObj.tag) {
      pObj.tag = paramObj.tag;
    }
    // Request projects json data
    max.request('GET', 'handle-projects.php', pObj, (XHR) => {
      const projObj = JSON.parse(XHR.responseText);
      // Make sure gallery empty
      gallery.innerHTML = '';
      // Add new projects
      projObj.projects.forEach(addProject);
    });
  }

  // Check message status
  function checkMessage(XHR) {
    const returnObj = JSON.parse(XHR.responseText);
    // Re-endable submit button
    msgForm.send.disabled = false;
    // Display message status
    msgStatus.innerHTML = returnObj.status;
    // Reset form, if successful
    if (returnObj.sent) {
      msgForm.reset();
    }
    // Clear message
    setTimeout(() => {
      msgStatus.innerHTML = '';
    }, 5000);
  }

  // Form submit via AJAX
  function sendMessage(event) {
    const email = msgForm.elements.email.value;
    const question = msgForm.elements.question.value;
    const paramObj = {
      from: email,
      message: question
    };
    // Stop page from refresh
    event.preventDefault();
    // Disable submit button
    msgForm.send.disabled = true;
    // Send message
    max.request('POST', 'send-message.php', paramObj, checkMessage);
    return false;
  }

  // Slide hero image rows
  function moveHeroImgs(row, xOffset, direction) {
    if ((row.offsetWidth + xOffset) >= 0) {
      row.style.[direction] = xOffset + 'px';
    }
  }

  // Handle scroll position
  function checkScroll(e) {
    const xPos = window.scrollY * -2;
    // Stop moving rows if they have already scrolled out of view
    if ((heroImg2.getBoundingClientRect().top + heroImg2.offsetHeight) >= 0) {
      // Use scroll position to move hero images
      moveHeroImgs(heroImg1, xPos, 'left');
      moveHeroImgs(heroImg2, xPos, 'right');
    }
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
