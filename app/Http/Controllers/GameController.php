<?php

namespace App\Http\Controllers;

use App\GameScore;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function saveScore(Request $request) {
        $name = $request->get('name');
        $score = $request->get('score');
        $level = $request->get('level');
        $kills = $request->get('kills');
        $bullets = $request->get('bullets');
        $powerup = $request->get('powerup');
        $time = $request->get('time');
        $filteredVal = filter_var($score,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid score"], 441 );
        }
        $filteredVal = filter_var($level,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid level"], 441 );
        }
        $filteredVal = filter_var($kills,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid kills"], 441 );
        }
        $filteredVal = filter_var($bullets,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid bullets"], 441 );
        }
        $filteredVal = filter_var($powerup,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid powerup"], 441 );
        }
        $filteredVal = filter_var($time,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid time"], 441 );
        }
        $game_score = new GameScore();
        $game_score->name = $name;
        $game_score->score = $score;
        $game_score->level = $level;
        $game_score->kills = $kills;
        $game_score->bullets = $bullets;
        $game_score->powerup = $powerup;
        $game_score->time = $time;
        $game_score->save();
        return response()-> json ("OK", 200);
    }
}
