<?php

use App\Http\Controllers\PersonController;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// header('Access-Control-Allow-Origin: *');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', function() {
    return 'ok';
});


Route::get('/pessoas', [PersonController::class, 'index']);

Route::post('/pessoas', [PersonController::class, 'store']);

Route::put('/pessoas/{pessoa}', [PersonController::class, 'update']);

Route::delete('/pessoas/{pessoa}', [PersonController::class, 'destroy']);

Route::get('/pessoas/{pessoa}', [PersonController::class, 'show']);

Route::get('/pessoas/search/{name}', [PersonController::class, 'search']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
