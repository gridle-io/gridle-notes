<?php 
namespace App\Http\Controllers;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\User;
use Config;
use Hash;
use \Firebase\JWT\JWT;  

class AuthenticateController extends Controller
{
    protected function jwt(User $user)
    {
        $key=env('JWT_AUTH','qwerty12345');

        $payload = array(
            'sub'   => $user->id,
            'iat'   => time(),
            'exp'   => time() + 60*60
        );
        return JWT::encode($payload, $key);
    }

    public function authenticate(Request $request )
    {
       
        // grab credentials from the request
        $credentials = $request->only('email', 'password');
        

        $user = User::where('email', '=', $credentials['email'])->first();
        if (!$user) {
            return response()->json(['error' => 'Your email not exists'], 401);
        }
        if (Hash::check($credentials['password'], $user->password)) {
            return response()->json(['jwt' => $this->jwt($user)], 200);
        } else {
            return response()->json(['error' => 'Wrong passwd'], 401);
        }



    }
}

?>