<?php

namespace App\Http\Controllers;

use App\Traits\RegisterUser;
use App\Http\Requests\RegistrationRequest;

class DashboardController extends Controller
{
    use RegisterUser;

    public function index()
    {
        $users = \App\User::all();
        $userId = Auth()::id;
        return view('dashboard', compact('users'));
    }

    public function create(RegistrationRequest $requestFields)
    {
        $user = $this->registerUser($requestFields);
        return back();
    }
}
