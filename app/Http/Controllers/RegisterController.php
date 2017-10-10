<?php


namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{


 protected function show()
        {
            return User::all(); 
        }

    protected function create(Request $request)
        {
            $data=$request->all();
            return User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        }
}
?>