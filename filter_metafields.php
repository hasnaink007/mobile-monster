<?php

	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	header('Content-Type: application/json');

	$json = file_get_contents('php://input');
	$paramKeysToExclude = ['id', 'description', 'owner_id', 'created_at', 'updated_at', 'owner_resource', 'admin_graphql_api_id'];
	$data = json_decode($json, true);

	if ($data !== null && isset($data['metafields'])) {
	    $filteredData = [];
	    
	    foreach ($data['metafields'] as $metafield) {
	        $filteredFields = array_diff_key($metafield, array_flip($paramKeysToExclude));
	        $filteredData[] = $filteredFields;
	    }
	    
	    $filteredJson = json_encode(['metafields' => $filteredData], JSON_PRETTY_PRINT);
	    
	    if ($filteredJson !== false) {
	        print_r(json_encode($filteredJson));
	    } else {
	        $errorJson = json_encode(['error' => 'Failed to encode JSON'], JSON_PRETTY_PRINT);
	        print_r(json_encode($errorJson));
	    }
	} else {
	    $errorJson = json_encode(['error' => 'Invalid JSON data'], JSON_PRETTY_PRINT);
	    print_r(json_encode($errorJson));
	}
?>