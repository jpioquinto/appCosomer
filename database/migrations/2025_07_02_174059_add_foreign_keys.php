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
        Schema::table('adm_usuarios', function (Blueprint $table) {
            $table->foreign('ur_id')->references('id')->on('adm_unidades_responsables')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('perfil_id')->references('id')->on('adm_perfiles')->onUpdate('CASCADE')->onDelete('CASCADE');
        });

        Schema::table('adm_permisos', function (Blueprint $table) {
            $table->foreign('perfil_id')->references('id')->on('adm_perfiles')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('modulo_id')->references('id')->on('adm_modulos')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('usuario_id')->references('id')->on('adm_usuarios')->onUpdate('CASCADE')->onDelete('CASCADE');
        });

        Schema::table('adm_contactos', function (Blueprint $table) {
            $table->foreign('usuario_id')->references('id')->on('adm_usuarios')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('puesto_id')->references('id')->on('adm_cat_puestos')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('municipio_id')->references('id')->on('adm_municipios')->onUpdate('CASCADE')->onDelete('CASCADE');
        });

        Schema::table('parametros', function (Blueprint $table) {
            $table->foreign('etapa_id')->references('id')->on('etapas')->onUpdate('CASCADE')->onDelete('CASCADE');            
        });

        Schema::table('informacion_conflictos', function (Blueprint $table) {
            $table->foreign('conflicto_id')->references('id')->on('conflictos')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('parametro_id')->references('id')->on('parametros')->onUpdate('CASCADE')->onDelete('CASCADE');
        });

         Schema::table('adm_municipios', function (Blueprint $table) {
            $table->foreign('estado_id')->references('id')->on('adm_estados')->onUpdate('CASCADE')->onDelete('CASCADE');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('adm_usuarios')) {
            Schema::table('adm_usuarios', function (Blueprint $table) {
                $table->dropForeign(['ur_id']);
                $table->dropForeign(['perfil_id']);
            });
        }

        if (Schema::hasTable('adm_permisos')) {
            Schema::table('adm_permisos', function (Blueprint $table) {
                $table->dropForeign(['perfil_id']);
                $table->dropForeign(['modulo_id']);
                $table->dropForeign(['usuario_id']);
            });
        }

        if (Schema::hasTable('adm_contactos')) {
            Schema::table('adm_contactos', function (Blueprint $table) {
                $table->dropForeign(['usuario_id']);
                $table->dropForeign(['puesto_id']);
                $table->dropForeign(['municipio_id']);
            });
        }

        if (Schema::hasTable('parametros')) {
            Schema::table('parametros', function (Blueprint $table) {
                $table->dropForeign(['etapa_id']);
            });
        }

        if (Schema::hasTable('informacion_conflictos')) {
            Schema::table('informacion_conflictos', function (Blueprint $table) {
                $table->dropForeign(['conflicto_id']);
                $table->dropForeign(['parametro_id']);
            });
        }

        if (Schema::hasTable('adm_municipios')) {
            Schema::table('adm_municipios', function (Blueprint $table) {
                $table->dropForeign(['estado_id']);
            });
        }

    }
};
