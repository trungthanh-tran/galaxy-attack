<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GameScore extends Model
{
    protected $table = 'score';
    protected $guarded = ['name', 'score', 'level', 'kills', 'bullets', 'powerup', 'time'];
}
