<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupon';
    protected $guarded = ['code', 'description', 'amount', 'currency'];
}
