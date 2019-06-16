<?php
/**
 * Created by PhpStorm.
 * User: Catalin
 * Date: 16/06/2019
 * Time: 16:44
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table = 'authors';

    protected $fillable = [
        'name',
        'description',
    ];
}