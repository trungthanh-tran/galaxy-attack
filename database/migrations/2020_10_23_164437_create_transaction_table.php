<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('transaction_id');
            $table->string('partner_id');
            $table->string('channel');
            $table->unsignedBigInteger("user_id");
            $table->string("package");
            $table->double("amount");
            $table->double("revenue");
            $table->string("coupon")->nullable();
            $table->tinyInteger("status")->default(-1);
            $table->string("response_text")->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('package')->references('package')->on('package');
            $table->unique("transaction_id");
            $table->index("user_id");
            $table->index("partner_id");
            $table->index("channel");
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
        Schema::dropIfExists('transaction');
    }
}
