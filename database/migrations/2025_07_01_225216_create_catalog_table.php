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
        Schema::create('cat_doccumentos', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('nombre', 600);
            $table->smallInteger('bloque')->default(1);
            $table->smallInteger('orden')->default(1);
            $table->smallInteger('estricto')->default(0);
            $table->smallInteger('control')->default(1);
            $table->smallInteger('interno')->default(1);            
            $table->smallInteger('estatus')->default(1);  
            $table->string('tipo_doc', 256)->nullable();
            $table->string('accion', 120)->nullable(); 
            $table->timestamp('creado_el')->useCurrent();         
        });

        Schema::create('cat_estatus', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('descripcion', 120);
            $table->smallInteger('tipo')->default(1);            
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_organizaciones', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('nombre', 350);
            $table->string('acronimo', 45);                        
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_parametros_acciones', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('accion', 45);
            $table->text('descripcion')->nullable();                        
            $table->string('tabla', 45)->nullable();                        
            $table->string('metodo', 45)->nullable();                        
            $table->string('clave', 25)->nullable();                        
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_regimen_social', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('regimen', 256);                      
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_responsables_avaluo', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('nombre', 256);                       
            $table->string('acronimo', 30);                                                
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_unidades', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('descripcion', 120);                                  
            $table->string('unidad', 15);                                                
            $table->smallInteger('categoria');          
            $table->smallInteger('estatus')->default(1);          
        });

        Schema::create('cat_vertientes', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('vertiente', 350);                                  
            $table->string('acronimo', 30);                                                                     
            $table->smallInteger('estatus')->default(1);          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_doccumentos');
        Schema::dropIfExists('cat_estatus');
        Schema::dropIfExists('cat_organizaciones');
        Schema::dropIfExists('cat_parametros_acciones');
        Schema::dropIfExists('cat_regimen_social');
        Schema::dropIfExists('cat_responsables_avaluo');
        Schema::dropIfExists('cat_unidades');
        Schema::dropIfExists('cat_vertientes');
    }
};
