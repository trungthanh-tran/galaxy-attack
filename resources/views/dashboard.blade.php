@extends('layouts.app')

@push("scripts")
    <script>
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        function renderData(data) {

        }
        function getHighcoreTable(response) {
            var html = "<table class=\"table\"><thead><tr><th>User</th><th>Score</th><th>Time</th><th>Archived at</th></tr></thead>";
            html += "<tbody>";
            fLen = response.length;

            for (i = 0; i < fLen; i++) {
                html += "<tr>";
                html += "<td>" + response[i].name + "</td>";
                html += "<td>" + response[i].score + "</td>";
                html += "<td>" + response[i].time + "</td>";
                html += "<td>" + response[i].created_at + "</td>";
                html += "</tr>";
            }
            html += "</ul>";
            html += "</tbody></table>";
            return html;
        }
        function renderHighscore(criteria) {
            var request = new XMLHttpRequest();

            // Define what happens on successful data submission
            request.addEventListener('load', function (event) {
                alert('Send score success');
            });


            // Define what happens in case of error
            request.addEventListener('error', function (event) {
                alert('SendCored error');
            });
            // Set up our request

            // Add the required HTTP header for form data POST requests
            // Finally, send our data.

            switch (criteria) {
                case 'score':
                    request.open('GET', '/api/get-highscore' + "?criteria=score&limit=10", true);
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            var response = JSON.parse(request.response);
                            html = getHighcoreTable(response);
                            document.getElementById("display-highscore").innerHTML = html;
                            document.getElementById("highscore-title").innerHTML = "Highscore by Score";
                        }
;
                    };
                    request.send(null);
                    break;
                case 'time':
                    request.open('GET', '/api/get-highscore' + "?criteria=time&limit=10", true);
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            var response = JSON.parse(request.response);
                            html = getHighcoreTable(response);
                            document.getElementById("display-highscore").innerHTML = html;
                            document.getElementById("highscore-title").innerHTML = "Highscore by Time";
                        }
                    };
                    request.send(null);
                    break;
                default:
                    alert("Invalid parame");
            }
        }

    </script>

@endpush

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

    <div class="modal" tabindex="-1" role="dialog" id="highscore" name="highscore">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><p id="highscore-title">Highscore</p></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body container">
                    <button type="button" class="btn btn-primary" onclick="renderHighscore('score')">Score</button>
                    <button type="button" class="btn btn-secondary" onclick="renderHighscore('time')">Time</button>
                    <div id="display-highscore" name="display-highscore">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
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
@endpush
