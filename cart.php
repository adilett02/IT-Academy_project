<?php
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	
	$get_product = file_get_contents("list__product.txt");
	
	echo $get_product;

	if (!empty($_POST['content'])) {

		$fd = fopen("list__product.txt", 'w') or die("не удалось открыть файл");

		$get_product = $_POST['content'];
		fwrite($fd, $get_product);
		fclose($fd);
	}

?>