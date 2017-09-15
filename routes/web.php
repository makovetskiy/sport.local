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

Route::group(['prefix'=>'/','middleware' => 'auth'], function()
{
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin', 'AdminController@index');
    Route::resource('start', 'StartsController');
    Route::post('/upload','AdminController@upload');
    
    
});
Auth::routes();



Route::get('/', 'HomeController@index');
Route::get('/home/{id}', 'HomeController@show');
Route::get('/home', 'HomeController@index');
