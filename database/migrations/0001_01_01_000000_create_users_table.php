<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adm_usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nickname', 40)->unique();
            $table->string('email', 160)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 100);
            $table->rememberToken();
            $table->timestamp('ultimo_acceso')->nullable();
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por');
            $table->smallInteger('estatus')->default(1);
            $table->string('archivo_cer')->nullable();
            $table->string('archivo_key')->nullable();
            $table->string('pass_key')->nullable();
            $table->integer('ur_id');
            $table->smallInteger('perfil_id');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adm_usuarios');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
