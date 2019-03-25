<?php
require_once '../info/portfolio.php';

header('Content-Type: text/css; charset=UTF-8');

$minWidth = "320px";
$smallWidth = "375px";
$midWidth = "568px";
$bigWidth = "724px";
$fullWidth = "1024px";

$fontFam = "Helvetica Neue, Helvetica, sans-serif";

$backColor = "#FFFFFF";
$textColor = "#000000";
$boxColor = "#EEEEEE";
$midColor = "#999999";
$blueColor = "#007AFF";
// create preload image list
$backimages = [
    'icon-menu-24px.svg',
    'icon-close-24px-b.svg',
    'icon-close-24px-w.svg',
    'icon-more-24px-b.svg',
    'icon-more-24px-w.svg',
    'icon-less-24px-b.svg',
    'icon-less-24px-w.svg',
    'icon-right-24px-b.svg',
    'icon-right-24px-w.svg',
    'me.jpg'
];
foreach ($backimages as $image) {
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
    /*min-width: <?= $minWidth ?>;*/
    text-align: left;
    font-size: 16px;
    font-family: <?= $fontFam ?>;
    color: <?= $textColor ?>;
    background-color: <?= $backColor ?>;
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
}
/*.syntax {
    float: left;
    font-size: 0.9em;
    font-family: "Courier New", "Courier", "Lucida Console", "Monaco", monospace;
    font-weight: 300;
    border-radius: 5px;
    padding: 5px 10px;
    color: #FFFFFF;
    background-color: #333233;
}
.syntax span:first-child {
    color: #B372DC;
}
.syntax span:last-child {
    color: #3AB6AB;
}*/

/* header section */
header .title {
    font-size: 1.5em;
    font-weight: 700;
    margin-right: 5px;
    cursor: pointer;
}
header > nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    white-space: nowrap;
    padding: 0 10px;
}
header > nav > * {
  
}
header > nav .slash {
    display: none;
    color: <?= $midColor ?>;
}

/* nav menu */
header > nav .menu_box {
    height: 0;
    flex: 1 0 0;
    z-index: 1;
    text-transform: capitalize;
}
header > nav ul.menu {
    display: flex;
    flex-flow: column nowrap;
    margin: 0 0 0 5px;
    border-radius: 5px;
    padding: 0 5px 15px;
}
header > nav ul.menu.open {
    color: <?= $backColor ?>;
    background-color: <?= $textColor ?>;
    box-shadow: 0 0 0 2px <?= $backColor ?>;
}
header > nav ul.menu > li {
    display: none;
    margin: 0 0 10px;
}
header > nav ul.menu.open > li {
    display: block;
}
header > nav ul.menu > li.sub_title {
    display: block;
    line-height: 44px;
    margin: 0;
}
header > nav ul.menu > li.sub_title span {
    padding-right: 25px;
    background:
        url(<?= $imgPath ?>icon-right-24px-b.svg)
        right center
        no-repeat;
    cursor: pointer;
}
header > nav ul.menu > li.sub_title span.selected {
    text-decoration: underline;
    background-image: url(<?= $imgPath ?>icon-more-24px-b.svg);
}
header > nav ul.menu.open > li.sub_title span {
    background-image: url(<?= $imgPath ?>icon-right-24px-w.svg);
}
header > nav ul.menu.open > li.sub_title span.selected {
    background-image: url(<?= $imgPath ?>icon-more-24px-w.svg);
}
header > nav ul.menu > li > div {
    float: left;
    padding: 0 20px;
    border-radius: 5px;
    cursor: pointer;
}
header > nav ul.menu > li > div.selected {
    color: <?= $textColor ?>;
    background:
        url(<?= $imgPath ?>icon-close-24px-b.svg)
        left center / contain
        no-repeat
        <?= $backColor ?>;
}
header > nav ul.menu > li.sub_menu_box {
    margin: 0;
}
header > nav ul.sub_menu {
    float: left;
    display: none;
    padding: 0 0 10px 20px;
}
header > nav ul.sub_menu.open {
    display: block;
}
header > nav  ul.sub_menu > li {
    margin: 0 0 10px;
    padding: 0 10px;
    cursor: pointer;
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
    border: 2px solid <?= $textColor ?>;
    border-radius: 5px;
    background:
        url(<?= $imgPath ?>icon-menu-24px.svg)
        center center / contain
        no-repeat;
    cursor: pointer;
}
header > nav .menu_btn.show {
    display: block;
}
header > nav .menu_btn.selected {
    background:
        url(<?= $imgPath ?>icon-close-24px-w.svg)
        center center / contain
        no-repeat
        <?= $textColor ?>;
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
/*
.container .nav_box .close_btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: <?= $midColor ?>;
    background-image: url(<?= $imgPath ?>icon-close-24px.svg);
    background-size: contain;
    background-repeat: no-repeat:
    background-position: center center;
    margin: 0 0 -1px 10px;
    border-radius: 5px;
}
*/
.container .nav_box > div {
    overflow: hidden;
}
.container .nav_box .profile_pic {
    width: 120px;
    height: 120px;
    margin: 15px 10px 10px;
    border-radius: 60px;
    float: right;
    background:
        url(<?= $imgPath ?>me.jpg)
        center center / cover
        no-repeat;
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
    color: <?= $textColor ?>;
    background-color: <?= $boxColor ?>;
}
form[name="ask"] input[type="email"]:focus, textarea:focus {
    border: 2px solid <?= $textColor ?>;
    background-color: <?= $backColor ?>;
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
    padding: 0 5px;
}
.categories li {
    padding: 5px;
}
.categories li > div {
    height: 40vh;
    min-height: 150px;
    max-height: 350px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    border: 2px solid <?= $textColor ?>;
    background-color: <?= $textColor ?>;
    cursor: pointer;
}
.categories li > div > .text {
    max-width: 80%;
    position: absolute;
    left: 10px;
    top: 20px;
    border-radius: 5px;
    padding: 10px;
    color: <?= $backColor ?>;
    background-color: <?= $blueColor ?>;
    box-shadow: 0 0 0 2px <?= $backColor ?>;
}
.categories li > div > .text > .heading {
  
}
.categories li > div > .text > span {
    font-weight: 300;
}
.categories li > div > .img {
    height: 50%;
    flex: 1 0 50%;
    border: 1px solid #000000;
    background:
        left center / cover
        no-repeat;
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
    header > nav .menu_box {
        
    }
    header > nav ul.menu {
        flex-flow: row wrap;
        align-items: baseline;
        padding: 0 0 0 5px;
    }
    header > nav ul.menu.open {
        color: initial;
        background-color: initial;
        box-shadow: none;
    }
    header > nav ul.menu > li {
        flex: 1 0 0;
        display: block;
        margin: 0 0 0 10px;
    }
    header > nav ul.menu > li.sub_title {
        flex: 0 0 0;
        margin: 0;
    }
    header > nav ul.menu > li.sub_title span.selected {
        /* fix icon */
    }
    header > nav ul.menu.open > li.sub_title span {
      background-image: url(<?= $imgPath ?>icon-right-24px-b.svg);
    }
    header > nav ul.menu.open > li.sub_title span.selected {
        background-image: url(<?= $imgPath ?>icon-more-24px-b.svg);
    }
    header > nav ul.menu > li.sub_menu_box {
        flex: 0 0 100%;
        order: 4;
        margin: 0 10px 0 0;
    }
    header > nav ul.menu > li > div {
        float: none;
        text-align: center;
        padding: 5px 25px;
        background-color: <?= $boxColor ?>;
    }
    header > nav ul.menu > li > div.selected {
        color: <?= $backColor ?>;
        background:
            url(<?= $imgPath ?>icon-close-24px-w.svg)
            left center / 24px 24px
            no-repeat
            <?= $textColor ?>;
    }
    header > nav ul.sub_menu {
        padding: 5px;
        border-radius: 5px;
    }
    header > nav ul.sub_menu.open {
        color: <?= $backColor ?>;
        background-color: <?= $textColor ?>;
        box-shadow: 0 0 0 2px <?= $backColor ?>;
    }
    header > nav ul.sub_menu > li {
        margin: 0 0 5px;
    }
    header > nav .menu_btn {
        width: 0;
        margin: 0;
        border: 0;
    }
    .container .nav_box {
        /*width: <?= $midWidth ?>;
        margin: 0 auto;*/
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
    .categories li > div > .img {
        height: 100%;
        flex: 1 0 25%;
    }
}
/* big size styles */
@media (min-width: <?= $bigWidth ?>) {
    header > nav .menu_box ul.menu > li.sub_menu_box {
        flex: 1 0 0;
        order: initial;
        margin: 0;
    }
    header > nav .menu_box ul.sub_menu {
        float: none;
    }
}