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


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('notes/{user_id}', 'NoteController@index')->middleware('check.Request');
Route::post('notes/{user_id}', 'NoteController@store');   
Route::put('notes/{id}', 'NoteController@update');
Route::delete('notes/{id}', 'NoteController@delete');
Route::delete('checkbox/{id}', 'ChecklistController@delete');
