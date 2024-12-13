<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\API\AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/permisos', [\App\Http\Controllers\API\PermisoController::class, 'index']);    
    Route::get('/menu', [\App\Http\Controllers\API\MenuController::class, 'index']);    
    Route::post('/user/save', [\App\Http\Controllers\API\UsuarioController::class, 'save']);    
    Route::get('/user/listado', [\App\Http\Controllers\API\UsuarioController::class, 'getUsers']);    
});