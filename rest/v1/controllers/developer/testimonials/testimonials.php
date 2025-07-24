<?php
//import header
require '../../../core/header.php';
//import function
require '../../../core/functions.php';
//import mysql
require '../../../models/developer/testimonials/Testimonials.php';

$body = file_get_contents('php://input');
// $body->testimonials_name;
$data = json_decode($body, true);
// $data['testimonials_name'];


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
}

checkEndpoint();
