<?php

// Set content as json
header('Content-Type: application/json; charset=UTF-8');

// MySQL query
function sqlQuery($statement) {
  global $sqlConnection;
  $mysqli = new mysqli(
    $sqlConnection->host,
    $sqlConnection->user,
    $sqlConnection->password,
    $sqlConnection->database
  );
  if ($result = $mysqli->query($statement)) {
    return $result;
  }
  $mysqli->close();
}

// Get SQL credentials from JSON file
$sqlConnection = json_decode(file_get_contents('../sql-connection.json'));

// Get parameters
$projectId = $_REQUEST['project'];

// Create projects array
$arrayName = 'projects';
$jsonArray = [$arrayName => []];

// Query projects based on parameters
$sqlSelect = "
  SELECT projects.id, projects.title, projects.description, projects.link, projects.cta, projects.source";
$sqlFrom = "
  FROM projects";
$sqlWhere = "
  WHERE (projects.status IS NULL OR projects.status <> 'HIDE')";
$sqlOrder = "
  ORDER BY date DESC";
if ($projectId != '') {
  $sqlWhere .= "
    AND projects.id = '$projectId'";
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

  // Add project object to array
  array_push($jsonArray[$arrayName], $project);
}

// Print assoc array as encoded json
echo json_encode($jsonArray);
