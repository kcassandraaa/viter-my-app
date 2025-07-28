<?php

// returnError('delete'); - check in network

//DELETE STEP 13
//check database
$conn = null;
$conn = checkDatabaseConnection();
//use model
$testimonials = new Testimonials($conn);

//DELETE STEP 14 -> functions.php
if (array_key_exists('id', $_GET)) {
    $testimonials->testimonials_aid = $_GET['id'];

    checkId($testimonials->testimonials_aid);
    $query = checkDelete($testimonials);
    http_response_code(200);
    returnSuccess($testimonials, 'testimonials delete', $query);
}

checkEndpoint();
