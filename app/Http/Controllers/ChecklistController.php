<?php
namespace App\Http\Controllers;
use App\Note;
use App\Checklist;

use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index()
    {
        return Note::with('checklist')->get();
    }

  
    
    public function delete(Request $request,$id)
    {
       
        $checkbox = Checklist::find($id)->delete();
        return response()->json("deleletd", 204);
    }
}
