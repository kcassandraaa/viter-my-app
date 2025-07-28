<?php

require 'Database.php';
require 'Response.php';

function checkDatabaseConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (PDOException $ex) {
        $response = new Response();
        $data = [];
        $data['success'] = true;
        $data['data'] = [];
        $data['count'] = 0;
        $data['type'] = 'invalid_request_error';
        $data['error'] = "Database Connection Failed.";
        $response->setData($data);
        $response->send();
        exit;
    }
}

function returnError($msg)
{
    $response = new Response();
    $data = [];
    $data['success'] = true;
    $data['data'] = [];
    $data['count'] = 0;
    $data['message'] = $msg;
    $response->setData($data);
    $response->send();
    exit;
}
function checkEndpoint()
{
    $response = new Response();
    $response->setSuccess(false);
    $error = [];
    $error['success'] = false;
    $error['code'] = '404';
    $error['error'] = 'Endpoint not found.';
    $response->setData($error);
    $response->send();
    exit;
}
function invalidInput()
{
    $response = new Response();
    $response->setSuccess(false);
    $error = [];
    $error['success'] = false;
    $error['code'] = '404';
    $error['error'] = 'Invalid input.';
    $response->setData($error);
    $response->send();
    exit;
}

function checkPayload($jsonData)
{
    if (empty($jsonData) || $jsonData === null) {
        invalidInput();
    }
}

function checkIndex($jsonData, $index)
{
    if (!isset($jsonData[$index]) || $jsonData === '') {
        invalidInput();
    }
    return trim($jsonData[$index]);
}

function returnSuccess($model, $name, $query, $data = '')
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = [$data];
    $returnData['count'] = $query->rowCount();
    $returnData["{$name} ID"] = $model->lastInsertedId;
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

function checkCreate($models)
{
    $query = $models->create();
    checkQuery($query, "There's something wrong with models. (create)");
    return $query;
}

// UPDATE STEP 20 - create function checkUpdate -> WebServices.php(models)
function checkUpdate($models)
{
    $query = $models->update();
    checkQuery($query, "There's something wrong with models. (update)");
    return $query;
}

function getResultData($query)
{
    $data = $query->fetchAll();
    return $data;
}

function getQueriedData($query)
{
    $response = new Response();
    $data = [];
    $data['success'] = true;
    $data['data'] = getResultData($query);
    $data['count'] = $query->rowCount();
    $data['dateNow'] = date('Y-m-d');
    $response->setData($data);
    $response->send();
    exit;
}

// DELETE STEP 15 - create function checkId
function checkId($id)
{
    $response = new Response();
    if ($id == '' || !is_numeric($id)) {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = '400';
        $error['error'] = 'ID cannot be blank or must be numeric';
        $error['success'] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// DELETE STEP 16 -> WebServices.php
function checkDelete($models)
{
    $query = $models->delete();
    checkQuery($query, "There's something wrong with models. (delete)");
    return $query;
}

function checkQuery($query, $msg)
{
    //IF QUERY IS FALSE THEN DO THIS CODE
    // ! = FALSE
    if (!$query) {
        $response = new Response();
        $data = [];
        $data['success'] = true;
        $data['error'] = $msg;
        $data['count'] = 0;
        $data['type'] = 'invalid_request_error';
        $data['dateNow'] = date('Y-m-d');
        $response->setData($data);
        $response->send();
        exit;
    }
}

function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}

function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "There's something wrong with models.");
    return $query;
}




// $conn = null;
// $conn = checkDatabaseConnection();

// $test = new Test($conn);


// $query = checkReadAll($test);
// getQueriedData($query);
