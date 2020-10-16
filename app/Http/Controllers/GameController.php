<?php

namespace App\Http\Controllers;

use App\GameScore;
use App\Http\Resources\HighScore;
use App\Http\Resources\HighScoreCollection;
use App\UserItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    /**
     * Get highscore item
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function getHighscore(Request $request) {
        $criteria = $request->get('criteria');
        if (!$criteria) {
            return response()->json(["message" => "Invalid criteria"], 441 );
        }
        $limit = $request->get('limit');
        $filteredVal = filter_var($limit,
            FILTER_VALIDATE_INT,
            array('options' => array('min_range' => 0)));
        if (false === $filteredVal) {
            return response()->json(["message" => "Invalid time"], 441 );
        }
        $highscore = GameScore::orderBy($criteria, 'desc')->take($limit)->get();
        return response()->json($highscore, 200);
    }

    /**
     * Check if user has an item
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkItem(Request $request) {
        $uid = $request->get('user_id');
        $item_id = $request->get('item_id');

        $item = UserItem::where([['user_id', '=', $uid], ['item_id', '=', $item_id]])->first();
        if (!$item) {
            return response()->json(["code" => 500, "message" => "Not set"], 200 );
        } else {
            return response()->json(["code" => 200, "message" => "Set"], 200 );
        }
    }

    /**
     * Get list of items by type
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItems(Request $request) {
        $uid = $request->get('user_id');
        $type = $request->get('type');
        if (is_null($uid)) return response()->json(["code"=>500, "message" =>"uid is invalid"], 200);
        if (is_null($type)) return response()->json(["code"=>500, "message" =>"types is invalid"], 200);
        $ships = DB::table('useritem')->select (["useritem.item_id as id"]) ->
            join ("items", "items.id", "=", "useritem.item_id")
            -> where([["useritem.user_id", "=", $uid],["items.item_note", "=", $type]])->get();
        return response()->json(["code"=>200, "message" =>"OK", "items" => $ships], 200);
    }

}
