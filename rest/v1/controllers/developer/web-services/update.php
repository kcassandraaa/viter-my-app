<?php
// returnError('update file'); to test the file

// UPDATE STEP 17
// declare db variable
$conn = null;
//use database
$conn = checkDatabaseConnection();
//use model
$webServices = new WebServices($conn);

// UPDATE STEP 18
if (array_key_exists('id', $_GET)) {
    checkPayload($data); //$data from web-services.php

    //variable from model
    $webServices->web_services_aid = $_GET['id'];
    $webServices->web_services_name = checkIndex($data, 'web_services_name');
    $webServices->web_services_description = $data['web_services_description'];
    $webServices->web_services_image = $data['web_services_image'];
    $webServices->web_services_link = $data['web_services_link'];
    $webServices->web_services_text_url = $data['web_services_text_url'];
    $webServices->web_services_updated = date("Y-m-d H:i:s");

    //VALIDATION STEP 6 -> ModalAddServices.jsx
    $web_services_name_old = $data['web_services_name_old'];

    compareName($webServices, $web_services_name_old, $webServices->web_services_name);

    //returnError($webServices->web_services_aid); - to check in network preview if the id is passed

    // UPDATE STEP 19 -> functions.php
    $query = checkUpdate($webServices);
    returnSuccess($webServices, 'web services update', $query);
}

checkEndpoint();
