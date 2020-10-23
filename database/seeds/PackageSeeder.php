<?php

use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ship_1 = array("package" => "ship1", "description" => "ship1" , "status" => 1, "amount" =>50);
        \App\Package::insert($ship_1);
        $ship_2 = array("package" => "ship2", "description" => "ship2" , "status" => 1, "amount" =>100);
        \App\Package::insert($ship_2);
        $ship_3 = array("package" => "ship3", "description" => "ship3" , "status" => 1, "amount" =>200);
        \App\Package::insert($ship_3);
        $ship_4 = array("package" => "ship4", "description" => "ship4" , "status" => 1, "amount" =>300);
        \App\Package::insert($ship_4);
        $ship_5 = array("package" => "ship5", "description" => "ship5" , "status" => 1, "amount" =>400);
        \App\Package::insert($ship_5);
        $ships = array("package" => "ships", "description" => "all ship" , "status" => 1, "amount" =>500);
        \App\Package::insert($ships);
        $bg_1 = array("package" => "bg1", "description" => "bg1" , "status" => 1, "amount" =>10);
        \App\Package::insert($bg_1);
        $bg_2 = array("package" => "bg2", "description" => "bg2" , "status" => 1, "amount" =>10);
        \App\Package::insert($bg_2);
        $bg_3 = array("package" => "bg3", "description" => "bg3" , "status" => 1, "amount" =>10);
        \App\Package::insert($bg_3);
        $bg_4 = array("package" => "bg4", "description" => "bg4" , "status" => 1, "amount" =>10);
        \App\Package::insert($bg_4);
        $bg_5 = array("package" => "bg5", "description" => "bg5" , "status" => 1, "amount" =>10);
        \App\Package::insert($bg_5);

    }
}
