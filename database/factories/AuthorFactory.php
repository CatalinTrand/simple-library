<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(\App\Author::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->sentence
    ];
});
