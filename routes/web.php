<?php

use App\Events\shareEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::post('/Share', function (Request $request) {
    // dd($request->message);
    $username = Auth::user()->name;
    $message = "{$username}  : Said {$request->message}";
    
    // create and brodcast the event
    event(new shareEvent($message));
    
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
