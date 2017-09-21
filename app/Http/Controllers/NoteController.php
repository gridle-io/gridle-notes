<?php

namespace App\Http\Controllers;
use App\Note;

use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        return Note::all();
    }

    public function show(Note $note)
    {   
        return $note;
    }

    public function store(Request $request)
    {
        
        $requestData = $request->all();
        $note = Note::create($requestData);
        // return $note->title;
        $arrayName = array(
            'note_id'=>$note->id,
            'title'=>$note->title,
            'data'=>$note->data,
            'is_checklist'=>$note->is_checklist,
            'updated_at'=>$note->updated_at,
            'created_at'=>$note->created_at
        );
        return $arrayName;
       return response()->json($arrayName, 201);
    }

    public function update(Request $request, Note $note)
    {
        $note->update($request->all());

        return response()->json($note, 200);
    }

    public function delete(Request $request,$id)
    {
       
        $note = Note:: where('note_id',$id)->delete();
       
        
        

        return response()->json("deleletd", 204);
    }
}
