<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $table = 'items';
    protected $guarded = ['id', 'item_name', 'item_note', 'url'];
}
