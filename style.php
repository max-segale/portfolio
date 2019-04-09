<?php
require_once '../info/portfolio.php';

// set content as css
header('Content-Type: text/css; charset=UTF-8');

// set scaling sizes
$smallWidth = '375px';
$midWidth = '568px';
$bigWidth = '724px';
$fullWidth = '1024px';

// set fonts and colors
$fontFam = '"Helvetica Neue", "Helvetica", sans-serif';
$boxColor = 'rgba(222, 222, 222, 1)';
$midColor = 'rgba(150, 150, 150, 1)';
$blackTrans = 'rgba(0, 0, 0, 0.75)';
$whiteTrans = 'rgba(255, 255, 255, 0.97)';
$blueColor = 'rgba(6, 127, 234, 1)';
$blueTrans = 'rgba(6, 127, 234, 0.8)';

// create preload image list
$backImages = [
    'icons/close-24px-b.svg',
    'icons/close-24px-w.svg',
    'icons/max-segale.svg',
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
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    background-color: <?= $blueColor ?>;
    transition: text-shadow 250ms linear, box-shadow 250ms linear;
}
.btn:active {
    text-shadow: 0 1px 3px <?= $blackTrans ?>;
    box-shadow: inset 0 1px 10px 0 <?= $blackTrans ?>;
}
.glass {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 15;
    left: 0;
    top: 0;
}
.backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: <?= $blackTrans ?>;
    -webkit-backdrop-filter: blur(32px);
    backdrop-filter: blur(32px);
    animation: fadeIn 500ms linear;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.no_scroll {
    overflow: hidden;
}
.no_select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* header section */
header {
    position: -webkit-sticky;
    position: sticky;
    z-index: 25;
    top: 0;
    padding: 10px 0;
    background-color: <?= $whiteTrans ?>;
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
.menu_box {
    height: 0;
    flex: 1 0 0;
    z-index: 30;
    text-transform: capitalize;
}
ul.menu {
    display: flex;
    flex-flow: column nowrap;
    margin: 0 0 0 5px;
    border-radius: 5px;
}
ul.menu.open {
    color: white;
    background-color: <?= $blackTrans ?>;
    box-shadow: 0 0 0 2px white;
    -webkit-backdrop-filter: blur(32px);
    backdrop-filter: blur(32px);
}
ul.menu > li {
    display: none;
    margin: 0 0 10px;
}
ul.menu > li:last-child {
    margin: 0 0 20px;
}
ul.menu.open > li {
    display: block;
}
ul.menu > li.sub_title {
    display: block;
    line-height: 45px;
    margin: 0;
}
ul.menu > li.sub_title span {
    padding: 0 25px 0 10px;
    background:
        url(<?= $imgPath . $backImages[6] ?>)
        right center
        no-repeat;
    cursor: pointer;
}
ul.menu > li.sub_title span:active {
    text-decoration: underline;
}
ul.menu > li.sub_title span.selected {
    text-decoration: underline;
    background-image: url(<?= $imgPath . $backImages[4] ?>);
}
ul.menu.open > li.sub_title span {
    background-image: url(<?= $imgPath . $backImages[7] ?>);
}
ul.menu.open > li.sub_title span.selected {
    background-image: url(<?= $imgPath . $backImages[5] ?>);
}
ul.menu > li > div {
    float: left;
    padding: 0 10px 0 25px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 250ms linear;
}
ul.menu > li > div:active {
    color: white;
    background-color: <?= $midColor ?>;
}
ul.menu > li > div.selected {
    color: black;
    background:
        url(<?= $imgPath . $backImages[0] ?>)
        left center / contain
        no-repeat
        white;
}

/* tag sub menu */
ul.menu > li.sub_menu_box {
    margin: 0;
}
ul.sub_menu {
    height: 0;
    overflow: hidden;
    float: left;
}
ul.sub_menu.open {
    height: initial;
}
ul.sub_menu > li {
    margin: 0 0 10px;
    padding: 0 0 0 25px;
    cursor: pointer;
}
ul.sub_menu > li:active {
    text-decoration: underline;
}
ul.sub_menu > li:last-child {
    margin: 0 0 20px;
}
ul.sub_menu > li.selected {
    text-decoration: underline;
}

/* nav menu icon */
.menu_btn {
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
.menu_btn:active {
    background-color: <?= $boxColor ?>;
}
.menu_btn.show {
    display: block;
}
.menu_btn.selected {
    background:
        url(<?= $imgPath . $backImages[1] ?>)
        center center / contain
        no-repeat
        <?= $blackTrans ?>;
}

/* content section */
.container {
    overflow: hidden;
}
.container > .heading {
    display: none;
    margin-left: 10px;
}
.container > .heading.show {
    display: block;
}
.nav_boxes {
    width: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
    transition: height 500ms ease-in;
}
.nav_boxes .nav_box {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
    opacity: 0;
    padding: 0 5px;
    transform: translateY(100%);
    transition: transform 500ms linear, opacity 500ms linear;
}
.nav_boxes .nav_box.show {
    position: relative;
    z-index: 2;
    opacity: 1;
    transform: translateY(0%);
}
.nav_box > div {
    overflow: hidden;
}
.nav_box > a > .btn {
    float: left;
    margin: 0 5px 20px;
}
.nav_box .profile_pic {
    width: 120px;
    height: 120px;
    margin: 15px 10px 10px;
    border-radius: 60px;
    float: right;
    cursor: pointer;
    background:
        url(<?= $imgPath . $backImages[8] ?>)
        center center / cover
        no-repeat;
    transition: border-radius 1s ease, transform 1s ease;
    animation: spinLeft 500ms linear;
}
.nav_box .profile_pic:active {
    border-radius: 0;
    transform: rotate(360deg);
}
@keyframes spinLeft {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}
.nav_box.show .profile_pic {
    animation: spinRight 500ms linear;
}
@keyframes spinRight {
    0% {
        transform: rotate(-360deg);
    }
    100% {
        transform: rotate(0deg);
    }
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
}
form[name="ask"] .status {
    font-size: 0.8em;
}

/* loading icon */
.loading {
    padding-top: 50%;
    opacity: 0.25;
    background:
        url(<?= $imgPath . $backImages[2] ?>)
        center center / 50%
        no-repeat;
    animation: loading 500ms ease infinite alternate;
}
@keyframes loading {
    0% {
        background-size: 0%;
    }
    100% {
        background-size: 50%;
    }
}

/* landing category display */
.categories li {
    height: 150px;
    position: relative;
    overflow: hidden;
    margin: 20px 0 0 0;
}
.categories li:first-child {
    height: 250px;
}
.categories li .text {
    max-width: 66.6666%;
    position: absolute;
    z-index: 20;
    left: 0;
    top: 0;
    cursor: pointer;
    padding: 10px 5px 10px 10px;
    border-radius: 0 5px 5px 0;
    color: white;
    background-color: <?= $blueTrans ?>;
    transition:
        padding 500ms ease,
        background 250ms ease,
        box-shadow 100ms linear;
    animation: fromLeft 1s ease-out;
}
@keyframes fromLeft {
    0% {
        left: -100%;
    }
    100% {
        left: 0;
    }
}
.categories li .text:hover {
    padding-left: 20px;
    box-shadow: 0 0 0 2px white;
}
.categories li .text:active, .categories li .text:active > * {
    background-color: black;
}
.categories li .text > .heading {
    display: inline;
}
.categories li .text > * {
    background-color: <?= $blueColor ?>;
}
.categories li .row {
    height: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    animation: slider 45s linear 1s infinite alternate;
}
.categories li:nth-child(2) .row {
    /*flex-flow: row-reverse nowrap;*/
    /*animation-direction: alternate-reverse;*/
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
.categories .cat_list_img {
    height: 100%;
    display: block;
    opacity: 0;
    margin: 0 5px 0 0;
    transform: translateX(100vw);
    transition: opacity 2s linear, transform 1s ease-out;
}
.categories .cat_list_img.show {
    opacity: 1;
    transform: translateX(0);
}
.categories li:first-child .cat_list_img {
    margin: 0;
}

/* project list items */
.projects li {
    margin: 0 0 25px 0;
}
.projects li .info {
    padding: 0 10px;
    margin: 0 0 5px 0;
}
.projects li .info .name {
    font-size: 1.2em;
    font-style: italic;
}
.projects li .images {
    display: flex;
    flex-flow: row wrap;
}
.projects li .images > .img {
    flex: 1 0 25%;
    cursor: pointer;
    padding-top: 25%;
    background:
        center center / cover
        no-repeat;
}
.projects li .images > .img:first-child {
    flex: 0 0 100%;
    padding-top: 75%;
}

/* footer section */
footer {
    text-align: center;
    padding-top: 100px;
    background: <?= $preImgList ?>;
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
    .container > .heading {
        margin-left: 20px;
    }
    .nav_boxes .nav_box {
        padding: 0 15px;
    }
    .nav_box .profile_pic {
        width: 144px;
        height: 144px;
        border-radius: 72px;
        margin-left: 20px;
    }
    .projects li .info {
        padding: 0 20px;
    }
}

/* mid size styles */
@media (min-width: <?= $midWidth ?>) {
    html, body {
        font-size: 18px;
    }
    ul.menu {
        flex-flow: row wrap;
        align-items: baseline;
    }
    ul.menu.open {
        color: initial;
        background-color: initial;
        box-shadow: none;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
    }
    ul.menu > li {
        flex: 1 0 0;
        display: block;
        margin: 0 10px 0 0;
    }
    ul.menu > li:last-child {
        margin: 0;
    }
    ul.menu.open > li.sub_title span {
      background-image: url(<?= $imgPath . $backImages[6] ?>);
    }
    ul.menu.open > li.sub_title span.selected {
        background-image: url(<?= $imgPath . $backImages[4] ?>);
    }
    ul.menu > li.sub_menu_box {
        flex: 0 0 100%;
        order: 4;
    }
    ul.menu > li > div {
        float: none;
        text-align: center;
        padding: 5px 0;
        border-radius: 5px;
        background-color: <?= $boxColor ?>;
    }
    ul.menu > li > div.selected {
        color: white;
        background:
            url(<?= $imgPath . $backImages[1] ?>)
            left center / 24px 24px
            no-repeat
            <?= $blackTrans ?>;
    }
    ul.sub_menu {
        border-radius: 5px;
    }
    ul.sub_menu.open {
        color: white;
        background-color: <?= $blackTrans ?>;
        box-shadow: 0 0 0 2px white;
        -webkit-backdrop-filter: blur(32px);
        backdrop-filter: blur(32px);
    }
    ul.sub_menu > li {
        margin: 10px 0;
        padding: 0 20px;
    }
    ul.sub_menu > li:last-child {
        margin: 10px 0;
    }
    .menu_btn {
        width: 0;
        margin: 0;
        border: 0;
    }
    /*.nav_boxes .nav_box {
        padding: 0 25px;
    }*/
    .nav_box .left {
        width: 50%;
        float: left;
        padding-right: 20px;
    }
    .nav_box .profile_pic {
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
    .menu_box ul.menu > li.sub_menu_box {
        flex: 1 0 0;
        order: initial;
        margin: 0 10px 0 0;
    }
    .menu_box ul.sub_menu {
        float: none;
    }
    ul.menu > li.sub_title {
        flex: 0 0 0;
    }
    .categories .img {
        /*padding-top: 100%;
        padding-left: 25%;*/
    }
}