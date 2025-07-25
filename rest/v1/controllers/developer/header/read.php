<?php

// CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDatabaseConnection();
// USE MODELS
$header = new Header($conn);

// if(array_key_exists('id', $_GET)){
//     $header->
// }

if (empty($_GET)) {
    $query = checkReadAll($header);
    http_response_code(200);
    getQueriedData($query);
}
