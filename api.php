<?php

require_once "./class.SqliteDB.php";
include_once "./class.SwishFormat.php";

$sf = new SwishFormat();
$db = new SqliteDB();

$db->connectDB('./__database/swish-123-data.sqlite');

header("Content-Type: text/plain;charset=UTF-8");


if (isset($_SERVER['REQUEST_METHOD'])) {
  if ($_SERVER['REQUEST_METHOD'] == "GET") {

    $action = "getCategories";
    if (isset($_GET['action'])) {
      $action = $_GET['action'];
    }

    $term = "insamlingskontroll";
    if (isset($_GET['term'])) {
      $term = $_GET['term'];
    }


    switch($action) {
      case "getCategories" :
        $result = $db->getCategoriesRanked();
        $json_response = json_encode($result);
        $response_status = 200;
        break;

      case "getRandomInCategory" :
        $result = $db->getSingleRandomFromCategories($term);
        $json_response = json_encode($result[0]);
        $response_status = 200;
        break;

      case "getFancyPresentation":
        $result = $sf->getSwishAllFormats($term);
        $json_response = json_encode($result);
        $response_status = 200;
        break;

      default :

        $response_status = 400;
        break;
    }
  }
}

switch($response_status) {
  case 200:
    $response_status_header = "HTTP/1.1 200 OK";
    break;

  case 400:

  default:
    $response_status_header = "HTTP/1.1 400 BAD REQUEST";
    break;
}

header($response_status_header);
if ($response_status == 200) {
  header("Content-Type: application/json; charset=UTF-8");
  die($json_response);
}

header("Content-Type: text/plain");
die("BAD REQUEST");
