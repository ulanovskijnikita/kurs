<?php
error_reporting(0);
mysqli_report(MYSQLI_REPORT_OFF);

$con = mysqli_connect('localhost', 'root', '', 'dont_clean_yourself');

if (mysqli_connect_errno()) {
    $str = '{"error": "Произошла ошибка в БД: ' . mysqli_connect_error() . '"}';
    $json = json_encode($str);
    echo($json);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE);

$query = mysqli_query($con, $input['query']);

if(is_null($query)) {
    $str = '{"error": "Произошла ошибка при запросе"}';
    $json = json_encode($str);
    echo($json);
    exit();
}

echo($query);