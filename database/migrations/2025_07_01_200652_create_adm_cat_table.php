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
        Schema::create('adm_cat_puestos', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('puesto', 65);
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_cat_tipo_correos', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('tipo', 45);
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_cat_tipo_telefonos', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('tipo', 45);
            $table->smallInteger('estatus')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adm_cat_puestos');
        Schema::dropIfExists('adm_cat_tipo_correos');
        Schema::dropIfExists('adm_cat_tipo_telefonos');
    }
};
