<?php


namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Config;
use Hash;
use \Firebase\JWT\JWT;  

class RegisterController extends Controller
{

    protected function jwt(User $user)
    {
        $key=env('JWT_AUTH','qwerty12345');

        $payload = array(
            'sub'   => $user->id,
            'iat'   => time(),
            'exp'   => time() + 365*24*60
        );
        return JWT::encode($payload, $key);
    }


 protected function show()
        {
            return User::all(); 
        }

    protected function create(Request $request)
        {
            $data=$request->all();
            $user = User::where('email', '=', $data['email'])->first();
            if ($user)  {
                return response()->json(["error"=>"Email already exists please try using forgot password"],201);
            }
          $user=User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
            return response()->json(['jwt' => $this->jwt($user),'user_id'=>$user->id], 200);
        }
}
?>