<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserConfig extends Model
{
    protected $table = 'user_configs';
    protected $fillable = ['user_id', 'ship_id', 'background_id'];

}
