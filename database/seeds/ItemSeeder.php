<?php

use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ship_1 = array("item_name" => "ship1", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_1);
        $ship_2 = array("item_name" => "ship2", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_2);
        $ship_3 = array("item_name" => "ship3", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_3);
        $ship_4 = array("item_name" => "ship4", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_4);
        $ship_5 = array("item_name" => "ship5", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_5);
        $ship_6 = array("item_name" => "default_ship", "item_note" => "ship" , "url" => ".png");
        \App\Items::insert($ship_6);
        $bg_1 = array("item_name" => "bg1", "item_note" => "bg" , "url" => ".png");
        \App\Items::insert($bg_1);
        $bg_2 = array("item_name" => "bg2", "item_note" => "bg" , "url" => ".png");
        \App\Items::insert($bg_2);
        $bg_3 = array("item_name" => "bg3", "item_note" => "bg" , "url" => ".png");
        \App\Items::insert($bg_3);
        $bg_4 = array("item_name" => "bg4", "item_note" => "bg" , "url" => ".png");
        \App\Items::insert($bg_4);
        $bg_5 = array("item_name" => "bg5", "item_note" => "bg" , "url" => ".png");
        \App\Items::insert($bg_5);
    }
}
