<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Start extends Model
{
    protected $fillable = ['id', 'title', 'description', 'date', 'time','photo','thumb','created_at', 'updated_at'];
}
