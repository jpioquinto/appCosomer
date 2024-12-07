<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Relations\{HasOne, BelongsTo};

use App\Models\Admin\{Perfil, Contacto};

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $table = 'adm_usuarios';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [            
            'password' => 'hashed',
        ];
    }

    public function perfil(): BelongsTo
    {
        return $this->BelongsTo(Perfil::class, 'perfil_id')->withDefault();
    }

    public function contacto(): HasOne
    {
        return $this->hasOne(Contacto::class, 'usuario_id')->withDefault();
    }
}
