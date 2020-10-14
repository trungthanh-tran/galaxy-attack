<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserItem extends Model
{
    protected $table = 'useritem';
    protected $guarded = ['id', 'user_id', 'item_id', 'amount'];
}
