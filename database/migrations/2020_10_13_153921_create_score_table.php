<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('score', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('score');
            $table->bigInteger('level');
            $table->bigInteger('kills');
            $table->bigInteger('bullets');
            $table->bigInteger('powerup');
            $table->bigInteger('time');
            $table->index('name');
            $table->index('score');
            $table->index('level');
            $table->index('kills');
            $table->index('bullets');
            $table->index('powerup');
            $table->index('time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('score');
    }
}
