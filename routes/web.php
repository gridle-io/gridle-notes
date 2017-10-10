<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index'); //returns index.blade.php
});
Route::post('/login', 'AuthenticateController@authenticate');
Route::post('/register', 'RegisterController@create'); 
Route::get('/view-users', 'RegisterController@show');
