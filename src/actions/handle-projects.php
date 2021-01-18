<?php

require_once '../info.php';
require_once '../../common/functions.php';

// Set content as json
header('Content-Type: application/json; charset=UTF-8');

// Get parameters
$projectId = $_REQUEST['project'];
$tagName = $_REQUEST['tag'];

// Create projects array
$arrayName = 'projects';
$jsonArray = [$arrayName => []];

// Query projects based on parameters
$sqlSelect = "
  SELECT projects.id, projects.title, projects.description, projects.link";
$sqlFrom = "
  FROM projects";
$sqlWhere = "
  WHERE projects.status IS NULL";
$sqlOrder = "
  ORDER BY date DESC";
if ($projectId != '') {
  $sqlWhere .= "
    AND projects.id = '$projectId'";
} else if ($tagName != '') {
  $sqlFrom .= "
    LEFT JOIN project_tags ON projects.id = project_tags.project_id";
  $sqlWhere .= "
    AND project_tags.name = '$tagName'";
}
$selectProjects = $sqlSelect . $sqlFrom . $sqlWhere . $sqlOrder;
$projects = sqlQuery($selectProjects);

// Loop project rows
while ($project = $projects->fetch_object()) {

  // Query project photos
  $selectPhotos = "
    SELECT id, type, file, caption
    FROM project_media
    WHERE projects_id = '$project->id'
      AND (status IS NULL OR status <> 'HIDE')
    ORDER BY date DESC";
  $photos = sqlQuery($selectPhotos);

  // Loop photo rows, get size, add url path, add to new array
  $photoArray = [];
  while ($photo = $photos->fetch_object()) {
    if (file_exists($photo->file)) {
      $imgSize = getimagesize($photo->file);
      $photo->width = $imgSize[0];
      $photo->height = $imgSize[1];
    }
    array_push($photoArray, $photo);
  }

  // Add photo array to project object
  $project->{'images'} = $photoArray;

  // Query project tags
  $selectTags = "
    SELECT name
    FROM project_tags
    WHERE project_id = '$project->id'
    ORDER BY name";
  $tags = sqlQuery($selectTags);

  // Add project object to array
  array_push($jsonArray[$arrayName], $project);
}

// Print assoc array as encoded json
echo json_encode($jsonArray);
