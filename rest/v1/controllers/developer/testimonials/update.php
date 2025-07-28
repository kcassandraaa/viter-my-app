<?php

//UPDATE STEP 11
// declare db variable
$conn = null;
//use database
$conn = checkDatabaseConnection();
//use model
$testimonials = new Testimonials($conn);

// UPDATE STEP 12 -> Testimonials.php (models)
if (array_key_exists('id', $_GET)) {
    checkPayload($data); //$data from testimonials.php

    //variable from model
    $testimonials->testimonials_aid = $_GET['id'];
    $testimonials->testimonials_name = checkIndex($data, 'testimonials_name');
    $testimonials->testimonials_position = $data['testimonials_position'];
    $testimonials->testimonials_comment = $data['testimonials_comment'];
    $testimonials->testimonials_image = $data['testimonials_image'];
    $testimonials->testimonials_updated = date("Y-m-d H:i:s");

    $query = checkUpdate($testimonials);
    returnSuccess($testimonials, 'testimonial update', $query);
}
