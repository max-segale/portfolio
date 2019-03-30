<?php
require_once '../info/portfolio.php';
// set content as css
header('Content-Type: text/css; charset=UTF-8');
// set scaling sizes
$smallWidth = '375px';
$midWidth = '568px';
$bigWidth = '724px';
$fullWidth = '1024px';
// set default styles
$fontFam = '"Helvetica Neue", "Helvetica", sans-serif';
$boxColor = '#EEEEEE';
$transBox = "rgba(0, 0, 0, 0.75)";
$midColor = '#999999';
$blueColor = '#007AFF';
// create preload image list
$backImages = [
    'icons/close-24px-b.svg',
    'icons/close-24px-w.svg',
    'icons/loading.gif',
    'icons/menu-24px.svg',
    'icons/more-24px-b.svg',
    'icons/more-24px-w.svg',
    'icons/right-24px-b.svg',
    'icons/right-24px-w.svg',
    'me.jpg'
];
foreach ($backImages as $image) {
    $preImgList .= "
        url($imgPath$image) no-repeat -9999px -9999px,";
}
$preImgList = substr($preImgList, 0, -1);
?>
/* global styles */
* {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
}

/* tag styles */
html, body {
    text-align: left;
    font-size: 16px;
    font-family: <?= $fontFam ?>;
    color: black;
    background-color: white;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
h1, h2, h3 {
    display: inline;
    font-size: inherit;
    font-weight: inherit;
}
a {
    text-decoration: none;
    color: inherit;
}
p {
    margin: 10px 5px;
}
ul {
    list-style: none;
}

/* general classes */
.wrapper {
    padding-top: 2.5vh;
}
.flex_row {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
}
.heading {
    display: block;
    font-size: 1.25em;
    text-transform: capitalize;
}
.heavy {
    font-weight: 700;
}
.margin {
    margin: 10px 5px;
}
.u_line {
    text-decoration: underline;
}
.btn {
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    background-color: <?= $blueColor ?>;
    transition: box-shadow 250ms;
}
.btn:active {
    box-shadow: inset 0 1px 10px 0 rgba(0, 0, 0, 0.75);
}
.glass {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 15;
    left: 0;
    top: 0;
}

/* header section */
header {
    user-select: none;
}
header .title {
    font-size: 1.5em;
    font-weight: 700;
    margin-right: 5px;
    cursor: pointer;
}
header .title:active {
    text-decoration: underline;
}
header > nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    white-space: nowrap;
    padding: 0 10px;
}
header > nav .slash {
    display: none;
    color: <?= $midColor ?>;
}

/* nav menu */
header > nav .menu_box {
    height: 0;
    flex: 1 0 0;
    z-index: 30;
    text-transform: capitalize;
}
header > nav ul.menu {
    display: flex;
    flex-flow: column nowrap;
    margin: 0 0 0 5px;
    border-radius: 5px;
}
header > nav ul.menu.open {
    color: white;
    background-color: <?= $transBox ?>;
    box-shadow: 0 0 0 2px white;
}
header > nav ul.menu > li {
    display: none;
    margin: 0 0 10px;
}
header > nav ul.menu > li:last-child {
    margin: 0 0 20px;
}
header > nav ul.menu.open > li {
    display: block;
}
header > nav ul.menu > li.sub_title {
    display: block;
    line-height: 45px;
    margin: 0;
}
header > nav ul.menu > li.sub_title span {
    padding: 0 25px 0 10px;
    background:
        url(<?= $imgPath . $backImages[6] ?>)
        right center
        no-repeat;
    cursor: pointer;
}
header > nav ul.menu > li.sub_title span:active {
    text-decoration: underline;
}
header > nav ul.menu > li.sub_title span.selected {
    text-decoration: underline;
    background-image: url(<?= $imgPath . $backImages[4] ?>);
}
header > nav ul.menu.open > li.sub_title span {
    background-image: url(<?= $imgPath . $backImages[7] ?>);
}
header > nav ul.menu.open > li.sub_title span.selected {
    background-image: url(<?= $imgPath . $backImages[5] ?>);
}
header > nav ul.menu > li > div {
    float: left;
    padding: 0 10px 0 25px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}
header > nav ul.menu > li > div:active {
    background-color: <?= $midColor ?>;
}
header > nav ul.menu > li > div.selected {
    color: black;
    background:
        url(<?= $imgPath . $backImages[0] ?>)
        left center / contain
        no-repeat
        white;
}
header > nav ul.menu > li.sub_menu_box {
    margin: 0;
}
header > nav ul.sub_menu {
    height: 0;
    overflow: hidden;
    float: left;
}
header > nav ul.sub_menu.open {
    height: initial;
}
header > nav  ul.sub_menu > li {
    margin: 0 0 10px;
    padding: 0 0 0 25px;
    cursor: pointer;
}
header > nav  ul.sub_menu > li:active {
    text-decoration: underline;
}
header > nav  ul.sub_menu > li:last-child {
    margin: 0 0 20px;
}
header > nav  ul.sub_menu > li.selected {
    text-decoration: underline;
}

/* nav menu icon */
header > nav .menu_btn {
    display: none;
    width: 30px;
    height: 30px;
    margin-left: 5px;
    border: 2px solid black;
    border-radius: 5px;
    background:
        url(<?= $imgPath . $backImages[3] ?>)
        center center / contain
        no-repeat;
    cursor: pointer;
}
header > nav .menu_btn:active {
    background-color: <?= $boxColor ?>;
}
header > nav .menu_btn.show {
    display: block;
}
header > nav .menu_btn.selected {
    background:
        url(<?= $imgPath . $backImages[1] ?>)
        center center / contain
        no-repeat
        <?= $transBox ?>;
}

/* content section */
.container {
    padding: 5px 0;
}
.container .nav_box {
    display: none;
    padding: 0 5px;
    overflow: hidden;
}
.container .nav_box.show {
    display: block;
}
.container .nav_box > div {
    overflow: hidden;
}
.container .profile_pic {
    width: 120px;
    height: 120px;
    margin: 15px 10px 10px;
    border-radius: 60px;
    float: right;
    background:
        url(<?= $imgPath . $backImages[8] ?>)
        center center / cover
        no-repeat;
    animation: spinPic 5s linear infinite;
}
@keyframes spinPic {
    100% {
        transform: rotate(-360deg);
    }
}
.container .nav_box > a > .btn {
    float: left;
    margin: 0 5px 20px;
}
.container > .heading {
    display: none;
    margin-left: 10px;
}
.container > .heading.show {
    display: block;
}

/* message form */
form[name="ask"] input, textarea {
    display: block;
    border-radius: 5px;
    font-family: <?= $fontFam ?>;
    outline: none;
    -webkit-appearance: none;
}
form[name="ask"] input[type="email"], textarea {
    width: 100%;
    margin-top: 5px;
    border: 2px solid <?= $boxColor ?>;
    padding: 3px 0 3px 5px;
    font-size: 0.8em;
    resize: none;
    color: black;
    background-color: <?= $boxColor ?>;
}
form[name="ask"] input[type="email"]:focus, textarea:focus {
    border: 2px solid black;
    background-color: white;
}
form[name="ask"] input[type="submit"] {
    margin: 5px 10px 10px 0;
    font-size: 1em;
    cursor: pointer;
}
form[name="ask"] .status {
    font-size: 0.8em;
}

/* landing menu */
.categories {
    user-select: none;
}
.categories li {
    height: 200px;
    position: relative;
    overflow: hidden;
    margin: 20px 0 0 0;
    /*border-bottom: 2px solid <?= $blueColor ?>;
    /*box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);*/
}
.categories li .text {
    position: absolute;
    z-index: 20;
    left: 0;
    top: -2px;
    margin-right: 10px;
    border: 2px solid white;
    border-left: 0;
    border-radius: 0 10px 10px 0;
    padding: 10px 20px;
    color: white;
    background-color: <?= $blueColor ?>;
    text-shadow: -1px 1px 3px rgba(0, 0, 0, 0.75);
    cursor: pointer;
    transition: padding 500ms, box-shadow 250ms;
    animation: fromLeft 2s ease-in;
}
@keyframes fromLeft {
    0% {
        margin-left: -100%;
    }
    100% {
        margin-left: 0;
    }
}
.categories li:hover .text {
    padding-left: 25px;
}
.categories li:active .text {
    box-shadow: inset 0 1px 10px 0 rgba(0, 0, 0, 0.75);
}
.categories li .row {
    height: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    animation: slider 15s ease-in-out infinite alternate;
}
.categories li:nth-child(2) .row {
    flex-flow: row-reverse nowrap;
    animation-direction: alternate-reverse;
}
@keyframes slider {
    0% {
        transform: translateX(0);
        left: 0;
    }
    100% {
        transform: translateX(-100%);
        left: 100%;
    }
}
.cat_list_img {
    height: 100%;
    display: block;
    margin-right: 5px;
    margin-left: 100%;
    opacity: 0;
    transition: margin 1s, opacity 1s;
}
/*.categories li:nth-child(2) .cat_list_img {
    transition: margin 2s
}*/
.cat_list_img.show {
    margin-left: 0;
    opacity: 1;
}
.categories li .img:nth-child(2),
.categories li .img:nth-child(5),
.categories li .img:nth-child(6) {
    /*flex: 1 0 66.666%;*/
}
.categories li:first-child > div > .img {
    /*padding-top: 33.3333%;*/
}

/* project list item */
.project {
    padding: 0 0 20px;
}
.project iframe.preview {
    width: 100%;
    height: 300px;
    border: 2px solid <?= $boxColor ?>;
    border-left: 0;
    border-right: 0;
    background-color: <?= $boxColor ?>;
}
.project > .info_box {
    padding: 0 5px;
}
.project > .info_box > .info {
    padding: 5px;
}
.project > .info_box > .info > .description h3 {
    font-size: 1.2em;
    font-style: italic;
}
.project > .info_box > .info > .description p {
    margin: 0;
}
.project > .image_box > .image_view > .images {

}
.project > .image_box > .image_view > .images > img {
    width: 100%;
    display: block;
}

/* footer section */
footer {
    text-align: center;
    padding-top: 100px;
    background: <?= $preImgList ?>;
    user-select: none;
}
footer .copyright {
    font-size: 0.75em;
    font-weight: 300;
    padding: 20px;
    color: <?= $midColor ?>;
}

/* begin expanding */
@media (min-width: <?= $smallWidth ?>) {
    header > nav .slash {
        display: block;
    }
    .container .nav_box {
        padding: 0 15px;
    }
    .container .nav_box .profile_pic {
        width: 144px;
        height: 144px;
        border-radius: 72px;
        margin-left: 20px;
    }
    .container > .heading {
        margin-left: 20px;
    }
    .project > .info_box {
        padding: 0 15px;
    }
}

/* mid size styles */
@media (min-width: <?= $midWidth ?>) {
    html, body {
        font-size: 18px;
    }
    header > nav ul.menu {
        flex-flow: row wrap;
        align-items: baseline;
    }
    header > nav ul.menu.open {
        color: initial;
        background-color: initial;
        box-shadow: none;
    }
    header > nav ul.menu > li {
        flex: 1 0 0;
        display: block;
        margin: 0 10px 0 0;
    }
    header > nav ul.menu > li:last-child {
        margin: 0;
    }
    header > nav ul.menu.open > li.sub_title span {
      background-image: url(<?= $imgPath . $backImages[6] ?>);
    }
    header > nav ul.menu.open > li.sub_title span.selected {
        background-image: url(<?= $imgPath . $backImages[4] ?>);
    }
    header > nav ul.menu > li.sub_menu_box {
        flex: 0 0 100%;
        order: 4;
    }
    header > nav ul.menu > li > div {
        float: none;
        text-align: center;
        padding: 5px 25px;
        border-radius: 5px;
        background-color: <?= $boxColor ?>;
    }
    header > nav ul.menu > li > div.selected {
        color: white;
        background:
            url(<?= $imgPath . $backImages[1] ?>)
            left center / 24px 24px
            no-repeat
            <?= $transBox ?>;
    }
    header > nav ul.sub_menu {
        border-radius: 5px;
    }
    header > nav ul.sub_menu.open {
        color: white;
        background-color: <?= $transBox ?>;
        box-shadow: 0 0 0 2px white;
    }
    header > nav ul.sub_menu > li {
        margin: 10px 0;
        padding: 0 20px;
    }
    header > nav ul.sub_menu > li:last-child {
        margin: 10px 0;
    }
    header > nav .menu_btn {
        width: 0;
        margin: 0;
        border: 0;
    }
    .container .nav_box .left {
        width: 50%;
        float: left;
        padding-right: 20px;
    }
    .container .nav_box .profile_pic {
        width: 200px;
        height: 200px;
        border-radius: 100px;
    }
    .categories .img {
        /*padding-top: 33.3333%;
        padding-left: 33.3333%;*/
        /*height: 100%;
        flex: 1 0 25%;*/
    }
}
/* big size styles */
@media (min-width: <?= $bigWidth ?>) {
    header > nav .menu_box ul.menu > li.sub_menu_box {
        flex: 1 0 0;
        order: initial;
        margin: 0 10px 0 0;
    }
    header > nav .menu_box ul.sub_menu {
        float: none;
    }
    header > nav ul.menu > li.sub_title {
        flex: 0 0 0;
    }
    .categories .img {
        /*padding-top: 100%;
        padding-left: 25%;*/
    }
}