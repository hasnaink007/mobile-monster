<?php

	/**
	 * This script is being used to shape shopify product data
	 * a product is provided in the input and this script create/split product
	 * into multilple products based on the storage option value
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

	$product = $data['product'];
	if(!array_key_exists("title", $product)){
		// echo json_encode(array("data"=>$data, "product" => $product));
		echo '{"error": "Product not found"}';
		die();
	}

	$product["status"] = 'draft';
    unset($product['id']);
    unset($product['created_at']);
    unset($product['updated_at']);
    unset($product['published_at']);
    unset($product['admin_graphql_api_id']);
    
    unset($product['image']['admin_graphql_api_id']);
    unset($product['image']['id']);
    unset($product['image']['product_id']);
    unset($product['image']['created_at']);
    unset($product['image']['updated_at']);
    $product['image']['variant_ids'] = [];
    
    for($i = 0; $i < sizeof($product['variants']); $i++ ){
        unset( $product['variants'][$i]['id'] );
        unset( $product['variants'][$i]['image_id'] );
        unset( $product['variants'][$i]['product_id'] );
        unset( $product['variants'][$i]['admin_graphql_api_id'] );
        unset( $product['variants'][$i]['created_at'] );
        unset( $product['variants'][$i]['updated_at'] );
    }

    for($i = 0; $i < sizeof($product['images']); $i++ ){
        unset( $product['images'][$i]['id'] );
        unset( $product['images'][$i]['product_id'] );
        unset( $product['images'][$i]['created_at'] );
        unset( $product['images'][$i]['updated_at'] );
        unset( $product['images'][$i]['admin_graphql_api_id'] );
        
        $product['images'][$i]['variant_ids'] = [];
    }

    for($i = 0; $i < sizeof($product['options']); $i++ ){
        unset( $product['options'][$i]['id'] );
        unset( $product['options'][$i]['product_id'] );
    }

    $variants = $product['variants'];
    $options = $product['options'];

    unset($product['options']);
    $product['variants'] = [];
    
    $products = [];

    for($i = 0; $i < sizeof($options); $i++){

        if(trim( strtoupper( $options[$i]["name"] ) ) == "STORAGE"){

            foreach( $options[$i]["values"] as $k => $val ){

                $p = $product;
                $p["options"] = array(
                    "position" => $options[$i]["position"],
                    "options" => $options
                );
                $p["options"]["options"][$i]["values"] = [$val];
                $products[$val] = $p;

            }
        }
    }
    
    foreach($products as $storage => $product){

        $position = $product["options"]["position"];
        
        foreach($variants as $key => $variant){
            if( $variant["option".$position] == $storage ){
                array_push($products[$storage]["variants"], $variant);
            }
        }
        $products[$storage]["options"] = $products[$storage]["options"]["options"];
    }
    
    foreach($products as $storage => $product){
        $title = trim($products[$storage]["title"]);
        $json = json_encode($products[$storage]);
        $json = str_replace($title, $title ." ".$storage, $json);
        
        $p = json_decode($json, true);
        $p["handle"] = strtolower(str_replace(" ", "-", $p["title"]));
        $products[$storage] = json_encode(array("product" => $p));
    }

    print_r(json_encode(array_values($products)));
?>
