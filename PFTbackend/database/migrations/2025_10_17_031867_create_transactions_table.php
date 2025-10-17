<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('budget_id')->nullable()->constrained()->onDelete('cascade'); // optional
            $table->string('name'); // short name of transaction
            $table->text('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->enum('type', ['income', 'expense']);
            $table->string('category');
            $table->date('transaction_date'); // when transaction occurred
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
