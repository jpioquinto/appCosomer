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
    Route::post('/ur/save-ur', [\App\Http\Controllers\API\URController::class, 'save']);    
    Route::post('/user/save', [\App\Http\Controllers\API\UsuarioController::class, 'save']);    
    Route::post('/user/save-passwd', [\App\Http\Controllers\API\UsuarioController::class, 'savePasswd']);    
    Route::get('/user/listado-user', [\App\Http\Controllers\API\UsuarioController::class, 'getUsers']);  
    Route::post('/user/change-status', [\App\Http\Controllers\API\UsuarioController::class, 'changeStatus']); 
    Route::post('/user/change-ur', [\App\Http\Controllers\API\UsuarioController::class, 'changeUR']); 
    Route::post('/user/change-perfil', [\App\Http\Controllers\API\UsuarioController::class, 'changePerfil']); 
    Route::get('/edo/listado-estados', [\App\Http\Controllers\API\EntidadController::class, 'getEdos']);    
    Route::get('/edo/listado-munpios/{edoId}', [\App\Http\Controllers\API\EntidadController::class, 'getMunpios'])->where(['edoId'=>'[0-9]+']);    
    Route::get('/ur/listado-ur', [\App\Http\Controllers\API\URController::class, 'getURs']);    
    Route::post('/ur/delete-ur', [\App\Http\Controllers\API\URController::class, 'deleteUR']);    
    Route::get('/perfil/listado-perfil', [\App\Http\Controllers\API\PerfilController::class, 'getPerfils']);    
    Route::get('/perfil/arbol-permisos/{id?}', [\App\Http\Controllers\API\PerfilController::class, 'getArbolPermiso'])->where(['id'=>'[0-9]+']);    
});