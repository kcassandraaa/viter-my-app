<?php

// CHECK DATABASE CONNECTION
$conn = null;
$conn = checkDatabaseConnection();
// USE MODELS
$contact = new Contact($conn);

// if(array_key_exists('id', $_GET)){
//     $contact->
// }

if (empty($_GET)) {
    $query = checkReadAll($contact);
    http_response_code(200);
    getQueriedData($query);
}
