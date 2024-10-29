<?php
$con = mysqli_connect('localhost', 'root', '', 'dont_clean_yourself');
$id = $_COOKIE['userId'];
$address = $_POST['address'];
$date = $_POST['date'];
$time = $_POST['time'];
$service = $_POST['service'];
$pay = $_POST['pay'];

mysqli_query($con, "INSERT INTO request (id, address, date, time, workId, statusId, payId) VALUES ('$id', '$address', '$date', '$time', '$service', 1, '$pay')");

if ( $service == 5 ) {
    $requestId = mysqli_insert_id($con);
    $otherDescription = $_POST['otherDescription'];

    mysqli_query($con, "INSERT INTO otherwork (requestId, otherWorking) VALUES ('$requestId', '$otherDescription')");
}