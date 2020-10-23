<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Galaxy Fight - Shoot for entertainment') }}</title>
        <script src="{{ mix('js/app.js') }}" defer></script>
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/game.css') }}" rel="stylesheet">
    </head>
    <body class="bg-light">
    <!-- Fixed navbar -->

    <nav class="top-bar top navbar navbar-transparent">
        <div class="col-md-12">
            <div class="py-4">
                @if (Route::has('login'))
                    <div class="top-right links">
                        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                            @auth
                                <a class="navbar-brand border border-white" href="/">Welcome {{ Auth::user()->name }}</a>
                            @endauth
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav align-items-center">
                                    @auth
                                        <a class="nav-item nav-link border border-white @if(Request::path() === '/') active @endif" href="{{ url('/') }}">Dashboard</a>
                                        <a class="nav-item">
                                            <form action="/logout"  onclick= "galaxy.clearStorage()" method="POST">
                                                @csrf
                                                <input type="submit" value="Logout" class="btn btn-outline-danger">
                                            </form>
                                        </a>
                                    @else
                                        <a class="nav-item nav-link @if(Request::path() === 'login') active @endif" href="{{ url('/login') }}">Login</a>
                                        @if (Route::has('register'))
                                            <a class="nav-item nav-link @if(Request::path() === 'register') active @endif" href="{{ url('/register') }}">Register</a>
                                        @endif
                                    @endauth
                                </div>
                            </div>
                        </nav>
                    </div>
                @endif
            </div>
        </div>
    </nav>

    @auth
        <input type="hidden" id="userId" name="userId" value="{{ Auth::user()->id }}">
        <input type="hidden" id="userName" name="userName" value="{{ Auth::user()->name }}">
    @endauth

                <div class="col-md-12">
                    <section>
                    @yield('content')
                    </section>
                </div>
        @stack('scripts')
    <div class="col-md-12">
        @extends('layouts.footer')
    </div>
    </body>
</html>
