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

Route::get('/register', 'RegistrationController@show')->name('register')->middleware('guest');
Route::get('/login', 'LoginController@show')->name('login')->middleware('guest');

Route::post('/register', 'RegistrationController@register');
Route::post('/login', 'LoginController@authenticate');

Route::middleware(['auth'])->group(function () {
    Route::get('/', 'DashboardController@index')->name('dashboard');

    Route::post('/logout', 'LoginController@logout');
    Route::get('/logout', 'LoginController@logout');
    Route::post('/user', 'DashboardController@create');
    Route::get('/pay', 'PayController@index');
});

Route::get("/privacy", function (){
    return view("privacy");
});
