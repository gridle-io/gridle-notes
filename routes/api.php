<?php

use Illuminate\Http\Request;

use App\Note;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('notes', 'NoteController@index');
Route::get('notes/{note}', 'NoteController@show');
Route::post('notes', 'NoteController@store');
// Route::get('notes/{id}','NoteController@edit');
Route::put('notes/{note}', 'NoteController@update');
Route::delete('notes/{id}', 'NoteController@delete');