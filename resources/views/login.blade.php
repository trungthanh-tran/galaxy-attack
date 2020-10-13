@extends('layouts.app')

@section('content')

    <section class="sigin">
        <!-- <img src="images/signup-bg.jpg" alt=""> -->
        <div class="container">
            <div class="signup-content">
                <form method="POST" action="/login" class="signup-form">
                    @csrf
                    <h2 class="form-title">Login Here</h2>
                    @if ($errors->any())
                        <div class="text-danger">
                            @foreach ($errors->all() as $error)
                                <p class="mb-0">{{ $error }}</p>
                            @endforeach
                        </div>
                    @endif
                    <div class="form-group">
                        <input type="Text" class="form-input" name="name" id="name" placeholder="Your username" value="{{ old('name') }}"/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" name="password" id="password" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="submit" id="submit" class="form-submit" value="Sign In"/>
                    </div>
                </form>
                <p class="loginhere">
                    <a href="/register" class="loginhere-link">Register new account</a>
                </p>
            </div>
        </div>
    </section>

@endsection
