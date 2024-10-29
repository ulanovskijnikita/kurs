<?php
// error_reporting(0);
// mysqli_report(MYSQLI_REPORT_OFF);

$con = mysqli_connect('localhost', 'root', '', 'dont_clean_yourself');

if (mysqli_connect_errno()) {
    $str = '{"error": "Тут должны быть данные, но произошла ошибка в БД: ' . mysqli_connect_error() . '"}';
    $json = json_encode($str);
    echo($json);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input= json_decode( $inputJSON, TRUE); 

$query = mysqli_query($con, $input['query']);

if(is_null($query)) {
    $str = '{"error": "Тут должны быть данные, но произошла ошибка в при запросе"}';
    $json = json_encode($str);
    echo($json);
    exit();
}

$fetch = mysqli_fetch_all($query, MYSQLI_ASSOC);
$json = json_encode( $fetch );

echo($json);