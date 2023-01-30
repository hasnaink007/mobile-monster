<?php

	/**
	 * This script is being used to link the variants in splitted products
     * to images the to used to have before the product was splitted
     * the integromate automation using this script can be accessed here https://www.integromat.com/scenario/3307408/edit#
	*/
	error_reporting('E_ALL');
	ini_set("error_reporting", E_ALL);
	ini_set('display_errors', 1);
	header('content-type: application/json');
	
	try{
		$data = json_decode(file_get_contents('php://input'), true);
	}catch(Exception $e){
		echo '{"error": "Invalid input"}';
		die();
	}

	$old_product = $data['old_product'];
	$new_product = $data['new_product'];
	if(!array_key_exists("product", $old_product) || !array_key_exists("product", $new_product)){
		// echo json_encode(array("data"=>$data, "product" => $product));
		echo '{"error": "Product not found"}';
		die();
	}


    $variants_updates = [];
    $old_variants = $old_product["product"]["variants"];
    $new_variants = $new_product["product"]["variants"];

    $variants_mapping = [];
    
    foreach($new_variants as $new_key => $new_variant){
        foreach($old_variants as $old_key => $old_variant){
            if($old_variant["sku"] == $new_variant["sku"]){
                $variants_mapping[] = array(
                    "old" => $old_variant,
                    "new" => $new_variant
                );
            }
        }
    }

    $imgs_mapping = [];
    foreach($new_product["product"]["images"] as $new_key => $new_image){
        foreach($old_product["product"]["images"] as $old_key => $old_image){
            $old = explode( ".", explode("/products/", $old_image["src"])[1])[0];
            $new = explode( ".", explode("/products/", $new_image["src"])[1])[0];

            if( strstr($new, $old) != ''){
                $imgs_mapping[] = array(
                    "old" => $old_image,
                    "new" => $new_image
                );
            }
        }
    }

    $updates = [];

    foreach($variants_mapping as $variants){
        foreach($imgs_mapping as $imgs){
            if( $imgs["old"]["id"] == $variants["old"]["image_id"] ){
                $updates[] = array(
                    "vid" => $variants["new"]["id"],
                    "image_id" => $imgs["new"]["id"],
                    "update" => '{"variant":{"id":'. $variants["new"]["id"] .',"image_id":'. $imgs["new"]["id"] .'}}'
                );
            }
        }
    }


    print_r( json_encode( array( "variants" => $variants_mapping, "imgs" => $imgs_mapping, "updates" => $updates ) ) );



?>