<?php

namespace App\Http\Controllers;

use App\Traits\RegisterUser;
use App\Http\Requests\RegistrationRequest;
use App\UserConfig;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Warning;

class DashboardController extends Controller
{
    use RegisterUser;

    public function index()
    {
        $users = \App\User::all();
        $user_config = UserConfig::where("user_id", Auth::user()->getAuthIdentifier())->first();
        if (!$user_config) {
            $user_config = (object) [ 'ship_id' => 6, 'background_id' => 7];
        }
        return view('dashboard', compact( 'user_config'));
    }

    public function create(RegistrationRequest $requestFields)
    {
        $user = $this->registerUser($requestFields);
        return back();
    }
}
