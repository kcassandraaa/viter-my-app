<?php

// returnError('delete'); - check in network

//DELETE STEP 13
//check database
$conn = null;
$conn = checkDatabaseConnection();
//use model
$webServices = new WebServices($conn);

//DELETE STEP 14 -> functions.php
if (array_key_exists('id', $_GET)) {
    $webServices->web_services_aid = $_GET['id'];

    checkId($webServices->web_services_aid);
    $query = checkDelete($webServices);
    http_response_code(200);
    returnSuccess($webServices, 'web services delete', $query);
}

checkEndpoint();
