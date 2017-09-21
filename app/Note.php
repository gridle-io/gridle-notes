<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
class Note extends Model
{
    //
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $primarykey = 'note_id';

    protected $fillable = ['title', 'is_checklist','data'];

   
     public function checklist()
	  {
	    return $this->hasMany('App\checklist');
	  }
}
