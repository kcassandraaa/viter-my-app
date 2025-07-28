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
    //GET = READ
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    //POST = CREATE
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }

    // UPDATE STEP 10 -> update.php
    //PUT = UPDATE
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        // returnError('update');
        // UPDATE STEP 16 -> update.php
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }

    //DELETE STEP 12 -> delete.php
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        //returnError('asd');
        $result = require 'delete.php';
        sendResponse($result);
        exit;
    }
}

checkEndpoint();
