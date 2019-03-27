<?php
require_once '../info/portfolio.php';
require_once '../common/functions.php';
// set content as json
header('Content-Type: application/json; charset=UTF-8');
// create assoc array
$jsonArray = [
    'nav'=>[
        'about',
        'contact'
    ],
    'categories'=>[]
];
// categories array items: name, summary, tag
$catArray = [
    [
        'Web Development',
        'Web Dev',
        'HTML, CSS, JavaScript, MySQL, PHP, UI/UX Design',
        'web'
    ],
    [
        'Graphic Design',
        'Designs',
        'Logos, Branding, Graphics',
        'design'
    ],
    [
        'Printmaking',
        'Prints',
        'Screen Prints, Posters',
        'print'
    ]
];
// loop categories array
foreach($catArray as $cat) {
    // create category object
    $category = new stdClass();
    $category->{'name'} = $cat[0];
    $category->{'short'} = $cat[1];
    $category->{'summary'} = $cat[2];
    $category->{'tag'} = $cat[3];
    // query category images
    $sql = "
  SELECT project_media.link
  FROM project_media
    LEFT JOIN project_tags
      ON project_media.project_id = project_tags.project_id
  WHERE project_media.type = 'PHOTO'
    AND project_media.tag_name = '$category->tag'
    AND project_tags.name = '$category->tag'
  ORDER BY RAND()
  LIMIT 10
    ";
    $photos = sqlQuery($sql);
    // create tag images array and push file urls
    $tagImages = [];
    while ($photo = $photos->fetch_object()) {
        $photo->link = $imgPath.$photo->link;
        array_push($tagImages, $photo);
    }
    // add tag images array to category object
    $category->{'images'} = $tagImages;
    // push category object to categories array
    array_push($jsonArray['categories'], $category);
}
// print assoc array as encoded json
echo json_encode($jsonArray);
?>