<?php

require_once 'categories.php';
require_once '../../info.php';
require_once '../../../common/functions.php';

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
        SELECT id, link, caption
        FROM project_media
        WHERE project_id = '$project->id'
            AND type = 'PHOTO'
            AND (status IS NULL OR status <> 'HIDE')
        ORDER BY date DESC";
    $photos = sqlQuery($selectPhotos);

    // loop photo rows, get size, add url path, add to new array
    $photoArray = [];
    while ($photo = $photos->fetch_object()) {
        $photoLocalPath = $photoDirLocal.'/'.$photo->link;
        if (file_exists($photoLocalPath)) {
            $imgSize = getimagesize($photoLocalPath);
            $photo->width = $imgSize[0];
            $photo->height = $imgSize[1];
        }
        $photo->link = 'img/' . $photo->link;
        array_push($photoArray, $photo);
    }

    // add photo array to project object
    $project->{'images'} = $photoArray;

    // query project tags
    $selectTags = "
        SELECT name
        FROM project_tags
        WHERE project_id = '$project->id'
        ORDER BY name";
    $tags = sqlQuery($selectTags);

    // loop tag rows, add to new array
    $tagArray = [];
    while ($tag = $tags->fetch_object()) {
        array_push($tagArray, $tag->name);
    }

    // add tag array to project object
    $project->{'tags'} = $tagArray;

    // add project object to array
    array_push($jsonArray[$arrayName], $project);
}

// add project category name
$jsonArray['category'] = $catArray[$tagName][0];

// print assoc array as encoded json
echo json_encode($jsonArray);
