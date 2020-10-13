@extends('layouts.app')

@section('content')
    <section class="signup">
        <!-- <img src="images/signup-bg.jpg" alt=""> -->
        <div class="container">
            <div class="signup-content">
                <form method="POST" action="/register" class="signup-form">
                    @csrf
                    <h2 class="form-title">Create account</h2>
                    @if ($errors->any())
                        <div class="py-2 px-4">
                            @foreach ($errors->all() as $error)
                                <p class="mb-0">{{ $error }}</p>
                            @endforeach
                        </div>
                    @endif
                    <div class="form-group">
                        <input type="text" class="form-input" name="name" id="name" placeholder="username"
                               value="{{ old('name') }}"/>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-input" name="email" id="email" placeholder="email"
                               value="{{ old('email') }}"/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" name="password" id="password" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" name="password_confirmation" id="password_confirmation"
                               placeholder="Repeat your password"/>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term"/>
                        <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all
                            statements in <a href="#" class="term-service">Terms of service</a></label>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="submit" id="submit" class="form-submit" value="Sign up"/>
                    </div>
                </form>
                <p class="loginhere">
                    Have already an account ? <a href="/login" class="loginhere-link">Login here</a>
                </p>
            </div>
        </div>
    </section>


@endsection


