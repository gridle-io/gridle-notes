<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class checklist extends Model
{
	//
    use SoftDeletes;
    //
    	protected $table ='checklist';
     	protected $dates = ['deleted_at'];

    	protected $fillable = ['label','is_checked'];

	    	public function note()
	  		{
	   			 return $this->belongsTo('App\Note');
	  		}


}
