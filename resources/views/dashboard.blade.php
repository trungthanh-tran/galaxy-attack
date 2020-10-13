@extends('layouts.app')

@section('content')
    <div id="wrap">
        <div id="wrap-inner">
            <canvas id="cbg1"></canvas>
            <canvas id="cbg2"></canvas>
            <canvas id="cbg3"></canvas>
            <canvas id="cbg4"></canvas>
            <canvas id="cmg"></canvas>
            <canvas id="cfg"></canvas>
        </div>
    </div>
@endsection

@push("scripts")
    <script>var galaxy = {};</script>
    <script src="{{ asset('js/jsfxr.js') }}"></script>
    <script src="{{ asset('js/util.js') }}"></script>
    <script src="{{ asset('js/storage.js') }}"></script>
    <script src="{{ asset('js/definitions.js') }}"></script>
    <script src="{{ asset('js/audio.js') }}"></script>
    <script src="{{ asset('js/text.js') }}"></script>
    <script src="{{ asset('js/hero.js') }}"></script>
    <script src="{{ asset('js/enemy.js') }}"></script>
    <script src="{{ asset('js/bullet.js') }}"></script>
    <script src="{{ asset('js/explosion.js') }}"></script>
    <script src="{{ asset('js/powerup.js') }}"></script>
    <script src="{{ asset('js/particle.js') }}"></script>
    <script src="{{ asset('js/particleemitter.js') }}"></script>
    <script src="{{ asset('js/textpop.js') }}"></script>
    <script src="{{ asset('js/levelpop.js') }}"></script>
    <script src="{{ asset('js/button.js') }}"></script>
    <script src="{{ asset('js/game.js') }}"></script>
    <script>
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

    </script>
@endpush
