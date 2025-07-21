<?php

// CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDatabaseConnection();
// USE MODELS
$webServices = new WebServices($conn);

// if(array_key_exists('id', $_GET)){
//     $webServices->
// }

if(empty($_GET)){
    $query = checkReadAll($webServices);
    http_response_code(200);
    getQueriedData($query);
    
}
