<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

echo file_get_contents( ( 'license_status.xml') );
?>