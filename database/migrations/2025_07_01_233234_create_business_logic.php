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
        Schema::create('conflictos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha')->nullable();            
            $table->integer('municipio_id'); 
            $table->string('folio', 45);           
            $table->string('asunto', 800);           
            $table->string('predio', 360)->nullable();           
            $table->string('promovente', 600)->nullable();           
            $table->string('contraparte', 600)->nullable();           
            $table->smallInteger('vertiente_id');           
            $table->integer('ha')->default(0);           
            $table->integer('area')->default(0);           
            $table->decimal('ca', 10, 4)->default(0);           
            $table->integer('num_beneficiario')->nullable();           
            $table->smallInteger('reg_soc_id')->nullable();           
            $table->string('nombre_reg_soc', 600)->nullable();           
            $table->smallInteger('estatus_id')->nullable();           
            $table->smallInteger('org_inv_id')->nullable();           
            $table->string('pueblo_indigena', 600)->nullable();           
            $table->string('anio_fiscal', 45)->nullable();           
            $table->text('problematica')->nullable();           
            $table->text('observaciones')->nullable(); 
            $table->smallInteger('estatus')->default(1);          
            $table->smallInteger('ur_id')->default(3);   
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por');
            $table->timestamp('actualizado_el')->nullable();
            $table->integer('actualizado_por')->nullable();
            $table->timestamp('eliminado_el')->nullable();
            $table->integer('eliminado_por')->nullable();           
        });

        Schema::create('etapas', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('etapa', 350);                    
            $table->integer('ponderacion')->default(0);                      
            $table->smallInteger('orden')->default(0);           
            $table->smallInteger('estatus')->default(1);           
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por')->default(1);
            $table->timestamp('actualizado_el')->nullable();
            $table->integer('actualizado_por')->nullable();
            $table->timestamp('eliminado_el')->nullable();
            $table->integer('eliminado_por')->nullable();           
        });

        Schema::create('parametros', function (Blueprint $table) {
            $table->increments('id');          
            $table->smallInteger('etapa_id'); 
            $table->string('parametro', 500);           
            $table->smallInteger('orden')->default(0);
            $table->decimal('ponderacion', 10, 2)->default(0);
            $table->smallInteger('calificable')->default(0);
            $table->smallInteger('requiere_doc')->default(0);
            $table->smallInteger('multiple_doc')->default(0);
            $table->smallInteger('multiple_cap')->default(0);
            $table->string('accion', 45)->nullable();           
            $table->text('definicion')->nullable(); 
            $table->smallInteger('estatus')->default(1);          
            $table->string('premisa_id', 50)->nullable();           
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por');
            $table->timestamp('actualizado_el')->nullable();
            $table->integer('actualizado_por')->nullable();
            $table->timestamp('eliminado_el')->nullable();
            $table->integer('eliminado_por')->nullable();           
        });

        Schema::create('informacion_conflictos', function (Blueprint $table) {
            $table->id();           
            $table->bigInteger('conflicto_id'); 
            $table->integer('parametro_id');           
            $table->json('dato');           
            $table->smallInteger('estatus')->default(1);          
            $table->smallInteger('validado')->default(0); 
            $table->integer('validado_por')->nullable(); 
            $table->timestamp('creado_el')->useCurrent();
            $table->integer('creado_por');
            $table->timestamp('actualizado_el')->nullable();
            $table->integer('actualizado_por')->nullable();
            $table->timestamp('eliminado_el')->nullable();
            $table->integer('eliminado_por')->nullable();           
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conflictos');
        Schema::dropIfExists('etapas');
        Schema::dropIfExists('parametros');
        Schema::dropIfExists('informacion_conflictos');
    }
};
