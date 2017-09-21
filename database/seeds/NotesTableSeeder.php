<?php

use Illuminate\Database\Seeder;
use App\Note;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Note::truncate();
        
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            Note::create([
                'title' => $faker->sentence,
                'data' => $faker->paragraph,
                'is_checklist'=> $faker->boolean($chanceOfGettingTrue = 90),
            ]);
        }
        
        //
    }
}
