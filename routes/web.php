<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;#quitar

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/{any}', function () {    
    return view('app');
})->where('any', '.*');