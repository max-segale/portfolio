<?php

require_once 'categories.php';
require_once '../info.php';
require_once '../../common/functions.php';

// Set content as json
header('Content-Type: application/json; charset=UTF-8');

// Create assoc array
$jsonArray = [
  'nav' => [
    'about',
    'contact'
  ],
  'categories' => []
];

// Loop categories array
foreach($catArray as $tag => $cat) {

  // Create category object
  $category = new stdClass();
  $category->{'name'} = $cat[0];
  $category->{'short'} = $cat[1];
  $category->{'summary'} = $cat[2];
  $category->{'tag'} = $tag;

  // Query category images
  $sql = "
    SELECT project_media.link, project_media.caption
    FROM project_media
      LEFT JOIN project_tags
      ON project_media.project_id = project_tags.project_id
    WHERE project_media.type = 'PHOTO'
      AND project_tags.name = '$tag'
      AND project_media.status = 'SELECT'
    ORDER BY RAND()
    LIMIT 10";
  $photos = sqlQuery($sql);

  // Create category images array and push file urls
  $tagImages = [];
  while ($photo = $photos->fetch_object()) {

    // Add url path
    $photo->link = 'img/' . $photo->link;
    array_push($tagImages, $photo);
  }

  // Add category images array to category object
  $category->{'images'} = $tagImages;

  // Push category object to categories array
  array_push($jsonArray['categories'], $category);
}

// Print assoc array as encoded json
echo json_encode($jsonArray);
