<?php

use Illuminate\Database\Seeder;
use App\Checkbox;

class CheckboxTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
     
        $Notes = Note::all()->lists('note_id');   //
    }
}
