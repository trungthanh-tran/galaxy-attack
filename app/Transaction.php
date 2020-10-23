<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transaction';
    protected $guarded = ['transaction_id', "user_id", "package_id", "coupon", "status", "response_text", "partner_id", "channel", "amount", "revenue"];
}
