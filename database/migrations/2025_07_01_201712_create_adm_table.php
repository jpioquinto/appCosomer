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
        Schema::create('adm_acciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('descripcion', 300);
            $table->string('clase', 180);
            $table->string('icono', 180);
            $table->smallInteger('estatus')->default(1);
            $table->smallInteger('tipo')->default(1);
            $table->smallInteger('orden')->default(0);
        });

        Schema::create('adm_contactos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('usuario_id');
            $table->string('nombre', 160)->nullable();
            $table->string('ap_paterno', 280)->nullable();
            $table->string('ap_materno', 280)->nullable();
            $table->string('cargo', 300)->nullable();
            $table->smallInteger('puesto_id')->nullable();
            $table->integer('municipio_id')->nullable();
            $table->smallInteger('info_completa')->default(0);
            $table->string('foto', 1024)->nullable();
        });

        Schema::create('adm_correos', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('contacto_id');
            $table->smallInteger('tipo');
            $table->string('email', 160);
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_estados', function (Blueprint $table) {
            $table->smallIncrements('id');            
            $table->string('estado', 80);
            $table->string('escudo', 256);
            $table->string('estado_iso', 20);
            $table->string('abreviatura', 15);
            $table->integer('poblacion')->nullable();
            $table->double('superficie')->nullable();
            $table->integer('loc_urbana')->nullable();
            $table->integer('loc_rural')->nullable();
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_modulos', function (Blueprint $table) {
            $table->smallIncrements('id');            
            $table->string('nombre', 200);
            $table->string('controlador', 80)->nullable();
            $table->string('icono', 45)->nullable();
            $table->string('clase', 45)->nullable();
            $table->smallInteger('orden')->nullable();
            $table->smallInteger('nodo_padre')->default(0);
            $table->smallInteger('estatus')->default(1);
            $table->string('acciones', 180)->nullable();
            $table->string('descripcion', 256)->nullable();
            $table->string('ruta', 70)->nullable();
            $table->smallInteger('grupo')->default(1);
        });

        Schema::create('adm_municipios', function (Blueprint $table) {
            $table->increments('id'); 
            $table->smallInteger('estado_id');           
            $table->string('municipio', 300);
            $table->integer('cve_mun')->nullable();
            $table->integer('poblacion')->nullable();
            $table->double('superficie')->nullable();
            $table->integer('loc_urbana')->nullable();
            $table->integer('loc_rural')->nullable();
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_perfiles', function (Blueprint $table) {
            $table->smallIncrements('id');         
            $table->string('nombre', 300);
            $table->string('descripcion', 500);
            $table->smallInteger('estatus')->default(1);
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por')->default(1);
        });

        Schema::create('adm_permisos', function (Blueprint $table) {
            $table->increments('id');  
            $table->smallInteger('perfil_id')->nullable();       
            $table->smallInteger('modulo_id');       
            $table->smallInteger('estatus')->default(1);
            $table->bigInteger('usuario_id')->nullable();
            $table->string('acciones', 380);
        });

        Schema::create('adm_telefonos', function (Blueprint $table) {
            $table->increments('id');  
            $table->bigInteger('contacto_id');       
            $table->smallInteger('tipo');       
            $table->string('lada', 6)->nullable();
            $table->string('telefono', 18);
            $table->integer('extension')->nullable();
            $table->smallInteger('estatus')->default(1);
        });

        Schema::create('adm_unidades_responsables', function (Blueprint $table) {
            $table->smallIncrements('id');  
            $table->string('nombre', 350);              
            $table->smallInteger('tipo')->default(1);       
            $table->smallInteger('estatus')->default(1);
            $table->string('carpeta', 160)->nullable();
            $table->string('sigla', 160)->nullable();
            $table->string('calle', 800)->nullable();
            $table->string('ext', 30)->nullable();
            $table->string('int', 30)->nullable();
            $table->string('col', 800)->nullable();
            $table->integer('municipio_id')->nullable();
            $table->string('cp', 15)->nullable();
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por');
            $table->timestamp('actualizado_el')->nullable();
            $table->integer('actualizado_por')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adm_acciones');
        Schema::dropIfExists('adm_contactos');
        Schema::dropIfExists('adm_correos');
        Schema::dropIfExists('adm_estados');
        Schema::dropIfExists('adm_modulos');
        Schema::dropIfExists('adm_municipios');
        Schema::dropIfExists('adm_perfiles');
        Schema::dropIfExists('adm_permisos');
        Schema::dropIfExists('adm_telefonos');
        Schema::dropIfExists('adm_unidades_responsables');
    }
};
