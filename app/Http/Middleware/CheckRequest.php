<?php

namespace App\Http\Middleware;
use Config;
use Closure;
use App\User;
use \Firebase\JWT\JWT;
use \Firebase\JWT\ExpiredException;
class CheckRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

      
    $key=env('JWT_AUTH','qwerty123456');

        $nullOnFail = false ;
        try {
            list($jwtType, $jwt) = explode(' ', $request->header('jwt'));
            // return response()->json($jwt);
        } catch(\ErrorException $e) {
            if ($nullOnFail)
                return null;
            return response()->json(['error' => 'Can not parse Authorization header'], 400);
        }
        if ($jwt) {
            try {
                $credentials = JWT::decode($jwt,$key, ['HS256']);
            } catch(ExpiredException $e) {
                if ($nullOnFail)
                    return $nullOnFail;
                return response()->json(['error' => 'jwt_expired'], 400);
            } catch(\Exception $e) {
                if ($nullOnFail)
                    return $nullOnFail;
                return response()->json(['error' => 'An error while decoding jwt'], 400);
            }

            // $user = User::where('id', '=', get_object_vars($credentials)['sub'])->first();
            
            $request->id=get_object_vars($credentials['sub']);
            return $next($request);
        }
        return response()->json(['error' => 'No jwt attached'], 401);
    }
        // return $next($request);
    }
