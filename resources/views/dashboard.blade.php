@extends('layouts.app')

@push("scripts")
    <script>
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        function renderData(data) {

        }

        function closePaymentModal() {
            $("#pay-now").modal("hide");
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

        function renderShipsTable(data) {
            var html = "<table class=\"table\"><thead><tr><th>Ship</th><th>Power Up</th><th>Action</th></tr></thead>";
            html += "<tbody>";
            for (i = 0; i < 5; i++) {
                html += "<tr>";
                html += "<td><img src='/images/ship_" + i + ".png' width='30' class='zoom'/></td>";
                html += "<td> <ul><li>+1 Extra life</li><li>+" + i + "% extra damage</li></ul></td>";
                if (data.includes(i + 1)) {
                    html += "<td><button type='button' class='btn btn-primary' onclick=\"galaxy.hero.selectHero(";
                    html+= "" + (i + 1) + "); closePaymentModal();\">Use Now</button></td>";
                } else {
                    html += "<td><button type='button' class='btn btn-info'>Pay $1" + i + "0 to get</button></td>";
                }
                html += "</tr>";
            }

            if (data.length === 0) {
                html += "<tr>";
                html += "<td>Get all ships</td>";
                html += "<td>Relax</td>";
                html += "<td><button type='button' class='btn btn-info'>Pay $500 to get</button></td>";
                html += "</tr>";
            }

            // Default ship
            html += "<tr>";
            html += "<td>Reset selected Ship</td>";
            html += "<td>No PowerUP</td>";
            html += "<td><button type='button' class='btn btn-primary' onclick=\"galaxy.hero.selectHero(6);closePaymentModal();\">Use Now</button></td>";
            html += "</tr>";


            html += "</ul>";
            html += "</tbody></table>";
            return html;
        }
        function renderHighscore(criteria) {
            var request = new XMLHttpRequest();
            // Define what happens in case of error
            request.addEventListener('error', function (event) {
                alert('SendCored error');
            });
            // Set up our request

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

        function renderItemList(criteria) {
            var request = new XMLHttpRequest();

            // Define what happens in case of error
            request.addEventListener('error', function (event) {
                alert('Get item LIST FAILURE');
            });
            // Set up our request

            // Add the required HTTP header for form data POST requests
            // Finally, send our data.

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/get-items', true);

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    items = JSON.parse(this.responseText);
                    flen = items.items.length;
                    var availableShips = [];
                    for (var i = 0; i < flen; i++) {
                        availableShips.push(items.items[i].id);
                    }
                    html = renderShipsTable(availableShips);
                    document.getElementById("display-item").innerHTML = html;
                }
            }
            data_send = "type=" + criteria + "&user_id=" + document.getElementById("userId").value;
            xhr.send(data_send);
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

    <div class="modal" tabindex="-1" role="dialog" id="pay-now" name="pay-now">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><p id="pay-title">Shop</p></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <button type="button" class="btn btn-primary" onclick="renderItemList('ship')">Ships</button>
                    <button type="button" class="btn btn-secondary" onclick="renderItemList('bg')">Background</button>
                    <div id="display-item" name="display-item">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="about-us" name="about-us">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><p id="pay-title">About US</p></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <ul>
                        <li>
                        Copyright 2020 © Glaxy Fight | SELL EVERYTHING LLC
                        </li>
                        <li>
                            16192 Coastal Highway Lewes, DE 19958 USA
                        </li>
                        <li>
                            (800)-832-9539
                        </li>
                    </ul>
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
