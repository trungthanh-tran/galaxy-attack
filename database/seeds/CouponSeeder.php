<?php

use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 151; $i++ ) {
            $one_coupon = array("code" => "lioncafe".$i."cp", "description" => "CP".$i."USD", "amount"=> $i, "currency" => "USD");
            \App\Coupon::insert($one_coupon);
        }
    }
}
