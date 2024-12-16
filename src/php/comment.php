<?php
$con = mysqli_connect('localhost', 'root', '', 'dont_clean_yourself');
$id = $_COOKIE['userId'];
$text = $_POST['text'];
$themeId = $_POST['themeId'];

$query = mysqli_query($con, "INSERT INTO comment (id, commentText, themeId) VALUES ('$id', '$text', '$themeId')");