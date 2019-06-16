<?php
/**
 * Created by PhpStorm.
 * User: Catalin
 * Date: 16/06/2019
 * Time: 16:44
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';

    protected $fillable = [
        'name',
        'description',
        'cover_image',
        'author_id',
        'tags'
    ];
}