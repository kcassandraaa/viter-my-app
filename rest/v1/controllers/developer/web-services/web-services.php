<?php
//set http header
require '../../../core/header.php';
//use needed functions
require '../../../core/functions.php';
//use models
require '../../../models/developer/web-services/WebServices.php';
//get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

    //GET = READ
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    //POST = CREATE
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }

    // UPDATE STEP 14
    //PUT = UPDATE
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        // returnError('update');
        // UPDATE STEP 16 -> update.php
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }
    // UPDATE STEP 15 - downlaod CORS from chrome web store then toggle on
}
