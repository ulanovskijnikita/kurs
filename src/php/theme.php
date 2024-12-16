<?php
$con = mysqli_connect('localhost', 'root', '', 'dont_clean_yourself');
$id = $_COOKIE['userId'];
$title = $_POST['title'];
$text = $_POST['text'];

mysqli_query($con, "INSERT INTO theme (id, themeTitle, themeText) VALUES ('$id', '$title', '$text')");
