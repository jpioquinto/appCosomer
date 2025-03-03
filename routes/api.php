<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [\App\Http\Controllers\API\AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/logout', [\App\Http\Controllers\API\AuthController::class, 'logout']);

    Route::get('/permisos', [\App\Http\Controllers\API\PermisoController::class, 'index']);    
    Route::get('/admin/listado-modulos', [\App\Http\Controllers\API\PermisoController::class, 'listarModulos']); 
    Route::post('/admin/delete-modulo', [\App\Http\Controllers\API\PermisoController::class, 'changeStatus']);    
    Route::post('/admin/save-modulo', [\App\Http\Controllers\API\PermisoController::class, 'saveModulo']);    
    Route::get('/menu', [\App\Http\Controllers\API\MenuController::class, 'index']);    
    Route::post('/ur/save-ur', [\App\Http\Controllers\API\URController::class, 'save']);    
    Route::post('/user/save', [\App\Http\Controllers\API\UsuarioController::class, 'save']);    
    Route::post('/user/save-passwd', [\App\Http\Controllers\API\UsuarioController::class, 'savePasswd']);    
    Route::get('/user/listado-user', [\App\Http\Controllers\API\UsuarioController::class, 'getUsers']);  
    Route::post('/user/change-status', [\App\Http\Controllers\API\UsuarioController::class, 'changeStatus']); 
    Route::post('/user/change-ur', [\App\Http\Controllers\API\UsuarioController::class, 'changeUR']); 
    Route::post('/user/change-perfil', [\App\Http\Controllers\API\UsuarioController::class, 'changePerfil']); 
    Route::get('/contact/listado-puestos', [\App\Http\Controllers\API\ContactoController::class, 'getListado']); 
    Route::post('/contact/subir-foto', [\App\Http\Controllers\API\ContactoController::class, 'subirFoto']); 
    Route::post('/contact/save-info', [\App\Http\Controllers\API\ContactoController::class, 'save']); 
    
    Route::post('/conflict/save', [\App\Http\Controllers\API\ConflictoController::class, 'save']); 
    Route::post('/conflict/delete-conflicto', [\App\Http\Controllers\API\ConflictoController::class, 'deleteConflicto']); 
    Route::get('/conflict/listado-conflictos', [\App\Http\Controllers\API\ConflictoController::class, 'getConflictos']); 
    
    Route::get('/edo/listado-estados', [\App\Http\Controllers\API\EntidadController::class, 'getEdos']);    
    Route::get('/edo/listado-munpios/{edoId}', [\App\Http\Controllers\API\EntidadController::class, 'getMunpios'])->where(['edoId'=>'[0-9]+']);    
    Route::get('/ur/listado-ur', [\App\Http\Controllers\API\URController::class, 'getURs']);    
    Route::post('/ur/delete-ur', [\App\Http\Controllers\API\URController::class, 'deleteUR']);    
    Route::get('/perfil/listado-perfil', [\App\Http\Controllers\API\PerfilController::class, 'getPerfils']);    
    Route::get('/perfil/arbol-permisos/{id?}', [\App\Http\Controllers\API\PerfilController::class, 'getArbolPermiso'])->where(['id'=>'[0-9]+']);  
    
    Route::get('/catalog/listado-vertientes', [\App\Http\Controllers\API\CatalogoController::class, 'listarVertientes']); 
    Route::get('/catalog/listado-unidades', [\App\Http\Controllers\API\CatalogoController::class, 'listarUnidades']); 
    Route::get('/catalog/listado-regimenes', [\App\Http\Controllers\API\CatalogoController::class, 'listarRegimenes']); 
    Route::get('/catalog/listado-organizaciones', [\App\Http\Controllers\API\CatalogoController::class, 'listarOrganizaciones']); 
    Route::get('/catalog/listado-estatus', [\App\Http\Controllers\API\CatalogoController::class, 'listarEstatus']); 
});