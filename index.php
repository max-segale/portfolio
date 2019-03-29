<?php
// stop cache
session_cache_limiter('nocache');
// basic info
$myName = "Max Segale";
$siteDesc = "A portfolio of work from $myName, full stack web developer and graphic designer.";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="<?= $siteDesc ?>">
    <meta name="author" content="<?= $myName ?>">
    <meta name="copyright" content="<?= $myName ?>">
    <meta name="robots" content="index, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?= $myName ?> 👨🏻‍💻 Portfolio</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" type="text/css" href="style.php">
    <script type="text/javascript" src="max.js"></script>
    <script type="text/javascript" src="portfolio.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <header>
        <nav>
          <h1 class="title" id="menu_title"><?= $myName ?></h1>
          <div class="slash heading">//</div>
          <div class="menu_box">
            <ul class="menu" id="menu_list">
              <li class="sub_title heading">
                <span id="sub_title">Portfolio</span>
              </li>
              <li class="sub_menu_box">
                <ul class="sub_menu" id="sub_menu_list"></ul>
              </li>
            </ul>
          </div>
          <div class="menu_btn" id="menu_btn"></div>
        </nav>
      </header>
      <div class="container">
        <div class="nav_box" id="about">
          <div class="profile_pic"></div>
          <h2 class="heading heavy margin">About</h2>
          <p>
            <span>I work as a full-stack web developer and graphic designer.</span>
            <span>I specialize in front-end development and UI/UX design.</span>
          </p>
          <p>
            <span>This a collection of freelance work, personal projects, and some old prints.</span>
            <span>Some exciting projects are in development right now so stay tuned for cool updates!</span>
          </p>
          <p>
            <span>I built this site using HTML5, CSS3, JavaScript, PHP, and MySQL.</span>
          </p>
          <a href="https://github.com/max-segale/portfolio" target="_blank">
            <div class="btn">View on GitHub</div>
          </a>
        </div>
        <div class="nav_box" id="contact">
          <div class="left">
            <h2 class="heading heavy margin">Contact</h2>
            <p>Please contact me about any new projects or job opportunities.</p>
            <p>
              <a href="tel:(908)752-0639">📱
                <span class="u_line">908.752.0639</span>
              </a>
              <br>
              <a href="mailto:maxsegale@gmail.com">📨
                <span class="u_line">maxsegale@gmail.com</span>
              </a>
            </p>
          </div>
          <div class="margin">
            <span>Any questions? Please ask. 💬</span>
            <form name="ask">
              <input type="email" name="email" placeholder="Your Email Address" maxlength="100" required>
              <textarea name="message" placeholder="Your Question" maxlength="255" rows="3" required></textarea>
              <div class="flex_row">
                <input class="btn" type="submit" name="send" value="Send" disabled>
                <div class="status" id="msg_status"></div>
              </div>
            </form>
          </div>
        </div>
        <span class="heading heavy margin" id="gallery_title"></span>
        <ul id="gallery_list"></ul>
      </div>
      <footer>
        <noscript>⚠️ Please enable JavaScript in your browser settings.</noscript>
        <div class="copyright">
          <span>&copy; <?= $myName.' '.date('Y') ?></span>
        </div>
      </footer>
    </div>
  </body>
</html>