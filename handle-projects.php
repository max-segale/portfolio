<?php
require_once '../info/portfolio.php';
require_once '../common/functions.php';

// set content as json
header('Content-Type: application/json; charset=UTF-8');

// get parameters
$projectId = $_REQUEST[project];
$tagName = $_REQUEST[tag];

// create projects array
$arrayName = 'projects';
$jsonArray = [$arrayName=>[]];

// query projects based on parameters
$sqlSelect = "
    SELECT projects.id, projects.name, projects.summary, projects.link";
$sqlFrom = "
    FROM projects";
$sqlWhere = "
    WHERE projects.status IS NULL";
$sqlOrder = "
    ORDER BY date DESC";
if ($projectId != "") {
        $sqlWhere .= "
        AND projects.id = '$projectId'";
} else if ($tagName != "") {
        $sqlFrom .= "
        LEFT JOIN project_tags ON projects.id = project_tags.project_id";
        $sqlWhere .= "
        AND project_tags.name = '$tagName'";
}
$sqlStatement = $sqlSelect.$sqlFrom.$sqlWhere.$sqlOrder;
$projects = sqlQuery($sqlStatement);

// loop project rows
while ($project = $projects->fetch_object()) {

    // query project photos
    $selectPhotos = "
    SELECT link, caption
    FROM project_media
    WHERE project_id = '$project->id' AND type = 'PHOTO'
    ORDER BY date DESC";
    $photos = sqlQuery($selectPhotos);

    // add photo rows to project object
    $photoArray = [];
    while ($photo = $photos->fetch_object()) {

        // get image size
        if (file_exists($photoDirLocal.$photo->link)) {
            $imgSize = getimagesize($photoDirLocal.$photo->link);
            $photo->width = $imgSize[0];
            $photo->height = $imgSize[1];
        }

        // add file path for photos
        $photo->link = $imgPath.$photo->link;
        array_push($photoArray, $photo);
    }
    $project->{'images'} = $photoArray;

    // query project tags
    $selectTags = "
    SELECT name
    FROM project_tags
    WHERE project_id = '$project->id'
    ORDER BY name";
    $tags = sqlQuery($selectTags);

    // push tag rows to tags array
    $tagArray = [];
    while ($tag = $tags->fetch_object()) {
        array_push($tagArray, $tag->name);
    }

    // add tags array to project object
    $project->{'tags'} = $tagArray;

    // add project object to array
    array_push($jsonArray[$arrayName], $project);
}

// add project category name
$jsonArray['category'] = $catArray[$tagName][0];

// print assoc array as encoded json
echo json_encode($jsonArray);
?>