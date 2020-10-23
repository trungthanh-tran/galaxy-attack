<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;

class PayController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->get('name');
        $price = $request->get('price');
        $url = $request->get('url');
        $user_config = array("name"=>$name, "price" => $price, "url" => $url);
        return view('pay') -> with($user_config);
    }
}
