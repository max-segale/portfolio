<?php
require_once '../info/portfolio.php';

// set content as css
header('Content-Type: text/css; charset=UTF-8');

// add full vendor prefixes to a property or value
function vFix($property, $value, $toValue) {
    $vendors = ['-webkit-', '-moz-', '-ms-'];
    foreach ($vendors as $v) {
        $propCSS .= "$v$property: ";
        if ($toValue) {
            $propCSS .= $v;
        }
        $propCSS .= "$value;
    ";
    }
    if ($toValue) {
        foreach ($vendors as $v) {
            $propCSS .= "$property: $v$value;
    ";
        }
    }
    $propCSS .= "$property: $value;";
    return $propCSS;
}

// set scaling sizes
$smallWidth = '375px';
$midWidth = '568px';
$bigWidth = '724px';
$fullWidth = '1024px';

// set fonts and colors
$fontFam = '"Helvetica Neue", "Helvetica", sans-serif';
$clear = 'rgba(0, 0, 0, 0)';
$boxColor = 'rgba(222, 222, 222, 1)';
$midColor = 'rgba(150, 150, 150, 1)';
$blackTrans = 'rgba(0, 0, 0, 0.8)';
$greyTrans = 'rgba(50, 50, 50, 0.96)';
$whiteTrans = 'rgba(255, 255, 255, 0.96)';
$blueColor = 'rgba(6, 127, 234, 1)';
$blueTrans = 'rgba(6, 127, 234, 0.96)';

// create preload image list
$backImages = [
    'menu'=>'icons/menu-24px.svg',
    'loading'=>'icons/max-segale.svg',
    'right_b'=>'icons/right-24px-b.svg',
    'right_w'=>'icons/right-24px-w.svg',
    'more_b'=>'icons/more-24px-b.svg',
    'more_w'=>'icons/more-24px-w.svg',
    'close_b'=>'icons/close-24px-b.svg',
    'close_w'=>'icons/close-24px-w.svg',
    'forward'=>'icons/forward-24px-w.svg',
    'back'=>'icons/back-24px-w.svg',
    'self'=>'me.jpg'
];
foreach ($backImages as $image) {
    $preImgList .= "
        url($imgPath/$image) no-repeat -9999px -9999px,";
}
$preImgList = substr($preImgList, 0, -1);

// global styles
$css = "/*
    max segale
    portfolio style sheet
*/
* {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
}";

// tag styles
$css .= "
html, body {
    text-align: left;
    font-size: 16px;
    font-family: $fontFam;
    color: black;
    background-color: white;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: $clear;
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
}";

// general classes
$btnTrans = vFix('transition',
    'text-shadow 250ms linear, box-shadow 250ms linear', false
);
$backBlur = vFix('backdrop-filter', 'blur(32px)', false);
$backTrans = vFix('transition', 'opacity 500ms linear', false);
$backAnimation = vFix('animation', 'fadeIn 500ms linear', false);
$userSelect = vFix('user-select', 'none', false);
$css .= "
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
    background-color: $blueColor;
    $btnTrans
}
.btn:active {
    text-shadow: 0 1px 3px $blackTrans;
    box-shadow: inset 0 1px 10px 0 $blackTrans;
}
.flex_row {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
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
    background-color: $greyTrans;
    $backBlur
    $backTrans
    $backAnimation
}
.see_thru {
    opacity: 0;
}
.no_scroll {
    overflow: hidden;
}
.no_select {
    -webkit-touch-callout: none;
    $userSelect
}";

// header section
$css .= "
header {
    position: -webkit-sticky;
    position: sticky;
    z-index: 25;
    top: 0;
    padding: 10px 0;
    background-color: $whiteTrans;
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
    color: $midColor;
}";

// nav menu
$menuFlex = vFix('flex', '1 0 0', false);
$menuBlur = vFix('backdrop-filter', 'blur(32px)', false);
$btnTrans = vFix('transition', 'background-color 250ms linear', false);
$css .= "
.menu_box {
    height: 0;
    z-index: 30;
    text-transform: capitalize;
    $menuFlex
}
ul.menu {
    display: flex;
    flex-flow: column nowrap;
    margin: 0 0 0 5px;
    border-radius: 5px;
}
ul.menu.open {
    color: white;
    background-color: $blackTrans;
    box-shadow: 0 0 0 2px white;
    $menuBlur
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
    cursor: pointer;
    background:
        url($imgPath/$backImages[right_b])
        right center
        no-repeat;
}
ul.menu > li.sub_title span:active {
    text-decoration: underline;
}
ul.menu > li.sub_title span.selected {
    text-decoration: underline;
    background-image: url($imgPath/$backImages[more_b]);
}
ul.menu.open > li.sub_title span {
    background-image: url($imgPath/$backImages[right_w]);
}
ul.menu.open > li.sub_title span.selected {
    background-image: url($imgPath/$backImages[more_w]);
}
ul.menu > li > div {
    float: left;
    padding: 0 10px 0 25px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    $btnTrans
}
ul.menu > li > div:active {
    color: white;
    background-color: $midColor;
}
ul.menu > li > div.selected {
    color: black;
    background:
        url($imgPath/$backImages[close_b])
        left center / contain
        no-repeat
        white;
}";

// tag sub-menu
$css .= "
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
}";

// nav menu icon
$css .= "
.menu_btn {
    display: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 5px;
    border: 2px solid black;
    border-radius: 5px;
    background:
        url($imgPath/$backImages[menu])
        center center / contain
        no-repeat;
}
.menu_btn:active {
    background-color: $boxColor;
}
.menu_btn.show {
    display: block;
}
.menu_btn.selected {
    background:
        url($imgPath/$backImages[close_w])
        center center / contain
        no-repeat
        $blackTrans;
}";

// content section
$boxesTrans = vFix('transition', 'height 500ms ease-in', false);
$boxTForm = vFix('transform', 'translateY(100%)', false);
$boxShowTForm = vFix('transform', 'translateY(0%)', false);
$boxTrans = vFix('transition',
    'transform 500ms linear, opacity 500ms linear', true
);
$picTrans = vFix('transition',
    'transform 1s ease, border-radius 1s ease', true
);
$picAni = vFix('animation', 'spinLeft 500ms linear', false);
$picShowAni = vFix('animation', 'spinRight 500ms linear', false);
$picTForm = vFix('transform', 'rotate(360deg)', false);
$css .= "
.container {
    overflow: hidden;
}
.nav_boxes {
    width: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
    $boxesTrans
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
    $boxTForm
    $boxTrans
}
.nav_boxes .nav_box.show {
    position: relative;
    z-index: 2;
    opacity: 1;
    $boxShowTForm
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
        url($imgPath/$backImages[self])
        center center / cover
        no-repeat;
    $picTrans
    $picAni
}
.nav_box .profile_pic:active {
    border-radius: 0;
    $picTForm
}
.nav_box.show .profile_pic {
    $picShowAni
}
.content > .heading {
    display: none;
    margin-left: 10px;
}
.content > .heading.show {
    display: block;
}";

// message form
$css .= "
form[name='ask'] input, textarea {
    display: block;
    border-radius: 5px;
    font-family: $fontFam;
    outline: none;
    -webkit-appearance: none;
}
form[name='ask'] input[type='email'], textarea {
    width: 100%;
    margin-top: 5px;
    border: 2px solid $boxColor;
    padding: 3px 0 3px 5px;
    font-size: 0.8em;
    resize: none;
    color: black;
    background-color: $boxColor;
}
form[name='ask'] input[type='email']:focus, textarea:focus {
    border: 2px solid black;
    background-color: white;
}
form[name='ask'] input[type='submit'] {
    margin: 5px 10px 10px 0;
    font-size: 1em;
}
form[name='ask'] .status {
    font-size: 0.8em;
}";

// category display menu
$textTrans = vFix('transition',
    'background 250ms ease, box-shadow 100ms linear',
    false
);
$textAni = vFix('animation', 'fromLeft 1s ease-out', false);
$imgTForm = vFix('transform', 'translateX(100vw)', false);
$imgShowTForm = vFix('transform', 'translateX(0)', false);
$imgTrans = vFix('transition',
    'transform 1s ease-out, opacity 2s linear', true
);
$imgAni = vFix('animation', 'slider 45s linear 1s infinite alternate', false);
$css .= "
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
    background-color: $blueTrans;
    $textTrans
    $textAni
}
.categories li .text:hover {
    box-shadow: 0 0 0 5px white;
}
.categories li .text:active, .categories li .text:active > * {
    background-color: black;
}
.categories li .text > .heading {
    display: inline;
}
.categories li .text > * {
    background-color: $blueColor;
}
.categories li .row {
    height: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    $imgAni
}
.categories .cat_list_img {
    height: 100%;
    display: block;
    opacity: 0;
    margin: 0 5px 0 0;
    $imgTForm
    $imgTrans
}
.categories .cat_list_img.show {
    opacity: 1;
    $imgShowTForm
}
.categories li:first-child .cat_list_img {
    margin: 0;
}";

// project list items
$itemAni = vFix('animation', 'projItem 750ms ease-out', false);
$imgFlex = vFix('flex', '1 0 0', false);
$imgAni = vFix('animation', 'fadeIn 1s linear', false);
$css .= "
.projects li {
    position: relative;
    margin: 0 0 25px 0;
    $itemAni
}
.projects li .info {
    padding: 0 10px;
    margin: 0 0 5px 0;
}
.projects li .info .name {
    font-size: 1.2em;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
}
.projects li .images {
    display: flex;
    flex-flow: row wrap;
    border: 1px solid white;
}
.projects li .images > .img {
    height: 125px;
    cursor: pointer;
    border: 1px solid white;
    background:
        center center / cover
        no-repeat;
    $imgFlex
    $imgAni
}
.projects li .images > .img.wide {
    background-position: center top;
}";

// project pop-up view
$projectTForm = vFix('transform', 'translateY(-50%)', false);
$projectTrans = vFix('transition', 'opacity 500ms linear', false);
$projectAni = vFix('animation', 'fadeIn 500ms linear', false);
$imgFlex = vFix('flex', '0 0 0', false);
$imgSelectFlex = vFix('flex', '0 0 100%;', false);
$imgTrans = vFix('transition', 'flex 250ms linear', true);
$thumbFlex = vFix('flex', '4 0 0', false);
$thumbSelectFlex = vFix('flex', '5 0 0', false);
$thubTrans = vFix('transition',
    'flex 250ms linear, border 250ms linear', true
);
$css .= "
.project {
    width: 100%;
    max-height: 100%;
    position: fixed;
    left: 0;
    top: 50%;
    z-index: 200;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    color: white;
    text-shadow: 0 1px 5px $blackTrans;
    $projectTForm
    $projectTrans
    $projectAni
}
.project .name {
    font-style: italic;
    padding: 10px 0 0 0;
}
.project .nav_box {
    width: 100%;
    overflow: hidden;
    padding: 5px 10px;
}
.project .nav_box .prev, .project .nav_box .next {
    width: 25px;
    height: 25px;
    cursor: pointer;
    background:
        center center / 100%
        no-repeat;
}
.project .nav_box .prev {
    float: left;
    background-image: url($imgPath/$backImages[back]);
}
.project .nav_box .next {
    float: right;
    background-image: url($imgPath/$backImages[forward]);
}
.project .nav_box .caption {
    font-weight: 300;
}
.project .img_box, .project .thumb_box {
    display: flex;
    flex-flow: row nowrap;
}
.project .img_box {
    width: 100%;
    max-width: 75vh;
}
.project .img_box > div {
    background:
        center center / contain
        no-repeat;
    $imgFlex
    $imgTrans

}
.project .img_box > div.selected {
    padding-top: 100%;
    $imgSelectFlex
}
.project .thumb_box {
    width: 100%;
    margin-top: 10px;
}
.project .thumb_box > div {
    height: 40px;
    cursor: pointer;
    margin-left: 10px;
    border: 2px solid white;
    border-radius: 20px;
    background:
        center center / 150%
        no-repeat;
    $thumbFlex
    $thubTrans
}
.project .thumb_box > div:first-child {
    margin-left: 0;
}
.project .thumb_box > div.selected {
    border: 5px solid $blueColor;
    $thumbSelectFlex
}
.project_close {
    width: 30px;
    height: 30px;
    position: fixed;
    z-index: 300;
    left: 5px;
    top: 5px;
    cursor: pointer;
    background:
        url($imgPath/$backImages[close_w])
        center center / 100%
        no-repeat;
}";

// loading icon
$loadAni = vFix('animation', 'loading 500ms ease infinite alternate', false);
$css .= "
.loading {
    padding-top: 50%;
    opacity: 0.25;
    background:
        url($imgPath/$backImages[loading])
        center center / 50%
        no-repeat;
    $loadAni
}";

// footer section
$css .= "
footer {
    text-align: center;
    padding-top: 100px;
    background: $preImgList;
}
footer .copyright {
    font-size: 0.75em;
    font-weight: 300;
    padding: 20px;
    color: $midColor;
}";

// animation frames
$sliderTForm = vFix('transform', 'translateX(0)', false);
$sliderTForm2 = vFix('transform', 'translateX(-100%)', false);
$spinLTForm = vFix('transform', 'rotate(0deg)', false);
$spinLTForm2 = vFix('transform', 'rotate(-360deg)', false);
$spinRTForm = vFix('transform', 'rotate(-360deg)', false);
$spinRTForm2 = vFix('transform', 'rotate(0deg)', false);
$css .= "
@keyframes fromLeft {
    0% {
        left: -100%;
    }
    100% {
        left: 0;
    }
}
@keyframes slider {
    0% {
        left: 0;
        $sliderTForm
    }
    100% {
        left: 100%;
        $sliderTForm2
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes spinLeft {
    0% {
        $spinLTForm
    }
    100% {
        $spinLTForm2
    }
}
@keyframes spinRight {
    0% {
        $spinRTForm
    }
    100% {
        $spinRTForm2
    }
}
@keyframes loading {
    0% {
        background-size: 0;
    }
    100% {
        background-size: 50%;
    }
}
@keyframes projItem {
    0% {
        left: 100%;
    }
    100% {
        left: 0;
    }
}";

// begin expanding layout
$css .= "
@media (min-width: $smallWidth) {
    header > nav .slash {
        display: block;
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
    .content > .heading {
        margin-left: 20px;
    }
    .projects li .info {
        padding: 0 20px;
    }
}";

// mid size layout
$menuBlur = vFix('backdrop-filter', 'none', false);
$itemFlex = vFix('flex', '1 0 0', false);
$subMenuFlex = vFix('flex', '0 0 100%', false);
$subMenuOrder = vFix('order', 4, false);
$subMenuBlur = vFix('backdrop-filter', 'blur(32px)', false);
$css .= "
@media (min-width: $midWidth) {
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
        $menuBlur
    }
    ul.menu > li {
        display: block;
        margin: 0 10px 0 0;
        $itemFlex
    }
    ul.menu > li:last-child {
        margin: 0;
    }
    ul.menu.open > li.sub_title span {
        background-image: url($imgPath/$backImages[right_b]);
    }
    ul.menu.open > li.sub_title span.selected {
        background-image: url($imgPath/$backImages[more_b]);
    }
    ul.menu > li.sub_menu_box {
        $subMenuFlex
        $subMenuOrder
    }
    ul.menu > li > div {
        float: none;
        text-align: center;
        padding: 5px 0;
        border-radius: 5px;
        background-color: $boxColor;
    }
    ul.menu > li > div.selected {
        color: white;
        background:
            url($imgPath/$backImages[close_w])
            left center / 24px 24px
            no-repeat
            $blackTrans;
    }
    ul.sub_menu {
        border-radius: 5px;
    }
    ul.sub_menu.open {
        color: white;
        background-color: $blackTrans;
        box-shadow: 0 0 0 2px white;
        $subMenuBlur
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
    .projects li .images > .img {
        height: 150px;
    }
    .project .nav_box, .project .thumb_box {
        max-width: 75vh;
    }
}";

// bigger size layout
$subMenuFlex = vFix('flex', '1 0 0', false);
$subMenuOrder = vFix('order', 'initial', false);
$subTitleFlex = vFix('flex', '0 0 0', false);
$css .= "
@media (min-width: $bigWidth) {
    .menu_box ul.menu > li.sub_menu_box {
        margin: 0 10px 0 0;
        $subMenuFlex
        $subMenuOrder
    }
    .menu_box ul.sub_menu {
        float: none;
    }
    ul.menu > li.sub_title {
        $subTitleFlex
    }
    .categories li .text {
        margin-left: 20px;
        border-radius: 5px;
    }
    .projects li .images > .img {
        height: 175px;
    }
}";

// mobile landscape layout

// full size layout
$css .= "
@media (min-width: $fullWidth) {
    header, .nav_boxes, .content, footer {
        width: $fullWidth;
        margin: 0 auto;
    }
    .projects li .images > .img {
        height: 200px;
    }
}";

// print css
echo $css;
?>